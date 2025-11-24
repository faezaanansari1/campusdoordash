import Order from "../models/Orders.js";
import MenuItem from "../models/MenuItem.js";
import User from "../models/Users.js";

const TAX_RATE = 0.06;
const FEE_MIN  = 0.99;
const FEE_RATE = 0.05;

// Creates an order: /api/orders/from-cart
export const createOrderFromCart = async (req, res) => {
  try {
    // Make sure cart exists and isn't empty
    let cart = req.user.cart;
    if (!Array.isArray(cart)) {
      cart = [];
    }

    // Validate cart
    if (cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Validate dropoff
    let dropoff = {};
    if (req.body && req.body.dropoff) {
      dropoff = req.body.dropoff;
    }

    if (!dropoff.building || typeof dropoff.building !== "string") {
      return res.status(400).json({ message: "Drop-off building is required" });
    }

    if (dropoff.details !== undefined && typeof dropoff.details !== "string") {
      return res.status(400).json({ message: "Drop-off details must be a string" });
    }

    // Collect all menuItem IDs from cart
    const ids = cart.map(line => line.menuItem);

    // Fetch official menu items (name, price, restaurant)
    const menuItems = await MenuItem.find(
      { _id: { $in: ids } },
      "name price restaurant"
    ).lean();

    const byId = new Map(menuItems.map(mi => [String(mi._id), mi]));

    // Build order items using official menu data
    const items = [];
    for (const it of cart) {
      const mi = byId.get(String(it.menuItem));
      if (!mi) {
        return res.status(400).json({ message: `Item not found: ${it.menuItem}` });
      }

      const qty = Number(it.quantity);
      if (!Number.isInteger(qty) || qty < 1) {
        return res.status(400).json({ message: "Invalid quantity in cart" });
      }

      items.push({
        menuItem: mi._id,
        name: mi.name,
        price: mi.price,   
        quantity: qty
      });
    }

    // Enforce "same restaurant" rule
    const firstRestaurantId = String(
      byId.get(String(items[0].menuItem)).restaurant
    );
    for (const oi of items) {
      const rId = String(byId.get(String(oi.menuItem)).restaurant);
      if (rId !== firstRestaurantId) {
        return res.status(400).json({
          message: "All items in one order must be from the same restaurant"
        });
      }
    }

    // Calculate totals
    let subtotal = 0;
    for (const it of items) {
      subtotal += it.price * it.quantity;
    }
    const tax = Number((subtotal * TAX_RATE).toFixed(2));
    const deliveryFee = Number(
      Math.max(FEE_MIN, subtotal * FEE_RATE).toFixed(2)
    );
    const total = Number((subtotal + tax + deliveryFee).toFixed(2));

    // Create order 
    const order = await Order.create({
      customer: req.user._id,
      restaurant: firstRestaurantId,
      retriever: null,          // will be assigned later
      items,
      subtotal,
      tax,
      deliveryFee,
      total,
      status: "pending",     
      dropoff: {
        building: dropoff.building,
        details: dropoff.details || "",
      },
    });

    // Clear cart after successful order
    req.user.cart = [];
    await req.user.save();

    return res.status(201).json({ order });
  } catch (error) {
    console.error("createOrderFromCart error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Gets current order: /api/orders/current
export const getMyCurrentOrder = async (req, res) => {
  try {
    const activeStatuses = ["pending","confirmed","preparing","picked_up","delivering",];

    // Finds order and returns it
    const order = await Order.findOne({
      customer: req.user._id,
      status: { $in: activeStatuses },
    })
      .sort({ createdAt: -1 })
      .populate("restaurant", "name")
      .populate("retriever", "name");

    return res.json(order || null);
  } catch (error) {
    console.error("getMyCurrentOrder error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Gets order status: /api/orders/:id/status
export const getOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({
      _id: id,
      customer: req.user._id
    }).select("status updatedAt createdAt retriever");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.json(order);
  } catch (error) {
    console.error("getOrderStatus error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Lists all the customer's orders: /api/orders/mine
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .sort({ createdAt: -1 });

    return res.json(orders);
  } catch (error) {
    console.error("getMyOrders error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Updates order status: /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;

    const allowedStatuses = ["pending","confirmed","preparing","picked_up","delivering","delivered","cancelled",];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    /*
    if (req.user.role === "retriever" && status === "cancelled") {
      return res.status(403).json({ message: "Not allowed to cancel order" });
    }
    */

    order.status = status;
    await order.save();

    return res.json(order);
  } catch (error) {
    console.error("updateOrderStatus error:", error);
    return res.status(500).json({ message: error.message });
  }
};


// Retrievers controller


export const listAvailableOrders = async (_req, res) => {
  try {
    const orders = await Order.find({
      status: { $in: ["confirmed", "preparing"] },
      retriever: null
    })
      .sort({ createdAt: 1 })
      .limit(50)
      .populate("restaurant", "name");

    return res.json(orders);
  } catch (err) {
    console.error("listAvailableOrders error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const claimOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOneAndUpdate(
      {
        _id: id,
        retriever: null, 
        status: { $in: ["confirmed", "preparing"] }
      },
      {
        retriever: req.user._id
        // status: "preparing"
      },
      { 
        new: true 
      }
    );

    if (!order) {
      return res.status(409).json({ message: "Already claimed or not available" });
    }

    return res.json(order);
  } catch (error) {
    console.error("claimOrder error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const myWork = async (req, res) => {
  try {
    const active = await Order.find({
      retriever: req.user._id,
      status: { $in: ["confirmed", "preparing", "picked_up", "delivering"] }
    }).sort({ createdAt: -1 });

    const history = await Order.find({
      retriever: req.user._id,
      status: "delivered"
    })
      .sort({ updatedAt: -1 })
      .limit(50);

    return res.json({ active, history });
  } catch (err) {
    console.error("myWork error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

