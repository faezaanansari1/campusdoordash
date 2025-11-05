import Restaurant from "../models/Restaurant.js";
import MenuItem from "../models/MenuItem.js";

// Lists All Restaurants : /api/restaurants/listRestaurants
export const listRestaurants = async (req, res) => {
    try {
        // Finds all the restaurants and returns them
        const restaurants = await Restaurant.find({}, "name img loc desc slug ratingAvg").lean();
        return res.status(404).json(restaurants);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get Restaurant : /api/restaurants/getRestaurantBySlug
export const getRestaurantBySlug = async (req, res) => {
    try {
        // Finds the requested restaurant and returns it.
        const { slug } = req.params;
        const restaurant = await Restaurant.findOne({ slug }).lean();
        if (!restaurant) {
        return res.status(404).json({ message: "Not found" });
        }
        return res.json(restaurant);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get Restaurant's Menu : /api/restaurants/getRestaurantMenu
export const getRestaurantMenu = async (req, res) => {
    try {
        // Finds the requested restaurant and stores it
        const { slug } = req.params;
        const restaurant = await Restaurant.findOne({ slug }, "_id name slug").lean();
        if (!restaurant) {
            return res.status(404).json({ message: "Not found" });
        }

        // Finds the menu items and stores it
        const items = await MenuItem.find(
        { restaurant: restaurant._id, isAvailable: true },"name price category isAvailable imageUrl")
        .sort({ category: 1, name: 1 })
        .lean();

        // Returns restaurant json and menuitem json
        return res.json({ restaurant, items });
    } catch (error) {
        console.error("getRestaurantMenu error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
