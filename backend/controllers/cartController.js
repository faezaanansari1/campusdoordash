import MenuItem from "../models/MenuItem.js";

// Gets User Cart : /api/cart/getCart
export const getCart = (req, res) => {

    // Get items in the cart and calculate subtotal
    const items = req.user.cart || [];
    let subtotal = 0;
    for (const it of items) {
        subtotal += (it.price || 0) * (it.qty || 0);
    }

    return res.json({ items, subtotal });
}

// Adds item to cart : /api/cart/addItem
export const addItem = async (req, res) => {
    try {
        const { menuItemId, quantity = 1, options = {} } = req.body;
        // if (!menuItemId || quantity < 1) {
        //     return res.status(400).json({ message: "menuItemId and qty greater than or equal to 1 are required" });
        // }

        if (!menuItemId) {
            return res.status(400>json({message:"menu item not found"}));
        }

        // Load the menu item
        const mi = await MenuItem.findById(menuItemId, "name price");
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
                options
            });
        }
        
        // Update user info
        await req.user.save();

        // Recompute the subtotal
        const items = req.user.cart.items || [];
        let subtotal = 0;
        for (const it of items){
            subtotal += (it.price || 0) * (it.qty || 0);
        }

        return res.status(201).json({ items, subtotal });
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
        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({ message: "qty must be an integer >= 1" });
        }
        const line = req.user.cart.id(cartItemId);
        if (!line) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        // Update quantity and save
        line.quantity = quantity;
        await req.user.save();

        // Recompute subtotal
        const items = req.user.cart || [];
        let subtotal = 0;
        for (const it of items){ 
            subtotal += (it.price || 0) * (it.qty || 0);
        }

        return res.json({ items, subtotal });
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

        // Remove the line and save
        line.deleteOne();            
        await req.user.save();       

        // Recompute subtotal
        const items = req.user.cart || [];
        let subtotal = 0;
        for (const it of items) subtotal += (it.price || 0) * (it.qty || 0);
        return res.json({ items, subtotal });
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
