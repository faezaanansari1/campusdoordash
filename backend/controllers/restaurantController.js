import Restaurant from "../models/Restaurant.js";
import MenuItem from "../models/MenuItem.js";

// Lists All Restaurants : /api/restaurants/listRestaurants
export const listRestaurants = async (req, res) => {
    try {
        // Finds all the restaurants and returns them
        const restaurants = await Restaurant.find({}, "name imageUrl location rating description").lean();
        return res.status(404).json(restaurants);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get Restaurant : /api/restaurants/getRestaurantByID
export const getRestaurantById = async (req, res) => {
    try {
        // Finds the requested restaurant and returns it.
        const { restaurantId } = req.params;
        const restaurant = await Restaurant.findById( restaurantId ).lean();
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
        const { restaurantId } = req.params;
        const restaurant = await Restaurant.findById( restaurantId , "name").lean();
        if (!restaurant) {
            return res.status(404).json({ message: "Not found" });
        }

        // Finds the menu items and stores it
        const items = await MenuItem.find(
        { restaurant: restaurant._id, },"name price imageUrl calories description")
        .sort({ name: 1 })
        .lean();

        // Returns restaurant json and menuitem json
        return res.json({ restaurant, items });
    } catch (error) {
        console.error("getRestaurantMenu error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
