import MenuItem from "../models/MenuItem.js";

const TAX_RATE = 0.06;
const FEE_MIN  = 0.99;
const FEE_RATE = 0.05;

function computeTotals(items = []) {
    let subtotal = 0;
    for (const it of items) {
        subtotal += (it.price || 0) * (it.quantity || 0);
    }

    let deliveryFee = 0;
    let tax = 0;
    let total = 0;

    if (items.length > 0) {
        deliveryFee = Math.max(FEE_MIN, subtotal * FEE_RATE);
        tax = +(subtotal * TAX_RATE).toFixed(2);
        total = +(subtotal + deliveryFee + tax).toFixed(2);
    }

    return { subtotal, deliveryFee, tax, total };
}

// Gets User Cart : /api/cart/getCart
export const getCart = (req, res) => {

    // Get items in the cart and calculate subtotal
    const items = req.user.cart || [];
    const { subtotal, deliveryFee, tax, total } = computeTotals(items);

    return res.json({ items, subtotal, deliveryFee, tax, total });
}

// Adds item to cart : /api/cart/addItem
export const addItem = async (req, res) => {
    try {
        const { menuItemId, quantity = 1, options = {} } = req.body;

        if (!menuItemId) {
            return res.status(400).json({message:"menu item not found"});
        }

        // Load the menu item
        const mi = await MenuItem.findById(menuItemId, "name price image_url");
        if (!mi) {
            return res.status(400).json({ message: "Item not found" });
        }

        const same = (req.user.cart || []).find(
            it => String(it.menuItem) === String(mi._id) &&
                JSON.stringify(it.options || {}) === JSON.stringify(options || {})
        );

        if (same) {
            same.quantity += quantity;
        } else{
            // Push a new cart item
            req.user.cart.push({
                menuItem: mi._id,
                name: mi.name,       
                price: mi.price,     
                quantity,
                options,
                image_url: mi.image_url
            });
        }
        
        // Update user info
        await req.user.save();

        // Recompute the subtotal
        const items = req.user.cart || [];
        const { subtotal, deliveryFee, tax, total } = computeTotals(items);
        return res.json({ items, subtotal, deliveryFee, tax, total });
    } catch {
        return res.status(500).json({ message: "Server error" });
    }
};

// Update Cart Item's quantity: /api/cart/updateItemQty/:cartItemId
export const updateItemQty = async (req, res) => {
    try {
        const { cartItemId } = req.params;   
        const { quantity } = req.body;            
        // Check quantity
        if (!Number.isInteger(quantity)) {
            return res.status(400).json({ message: "qty must be an integer" });
        }
        const line = req.user.cart.id(cartItemId);
        if (!line) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        if (quantity === 0) {
            line.deleteOne();
        } else {
            // Update quantity
            line.quantity = quantity;
        }

        await req.user.save();

        // Recompute subtotal
        const items = req.user.cart || [];
        const { subtotal, deliveryFee, tax, total } = computeTotals(items);
        return res.json({ items, subtotal, deliveryFee, tax, total });
    } catch {
        return res.status(500).json({ message: "Server error" });
    }
};

// Remove item frm Cart : /api/cart/removeItem/:cartItemId
export const removeItem = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const line = req.user.cart.id(cartItemId);
        if (!line) return res.status(404).json({ message: "Cart item not found" });

        if (line.quantity > 1) {
            line.quantity -= 1;
        } else {
            // If it would go to 0, remove the line entirely
            line.deleteOne();
        }

        await req.user.save();       

        // Recompute subtotal
        const items = req.user.cart || [];
        const { subtotal, deliveryFee, tax, total } = computeTotals(items);
        return res.json({ items, subtotal, deliveryFee, tax, total });  
    } catch {
        return res.status(500).json({ message: "Server error" });
    }
};

// Clear User Cart : /api/cart/clearCart
export const clearCart = async (req, res) => {
    try {
        // Empty the embedded array and save
        req.user.cart = [];    
        await req.user.save();
        return res.status(204).end(); 
    } catch {
        return res.status(500).json({ message: "Server error" });
    }
};
