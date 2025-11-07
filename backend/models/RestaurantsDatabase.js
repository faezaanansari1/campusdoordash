import mongoose from "mongoose";

//Defines the menu item schema
const menuItemSchema = new mongoose.Schema({
    item_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image_url: { type: String, default: "" },
    calories: { type: Number, default: null },
    description: { type: String, default: "" },
});

//Defines Restaurant Schema
const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image_url: { type: String, required: true },
    description: { type: String, default: "" },
    rating: { type: Number, min: 0, max: 5, default: 0},
    restaurant_id: { type: String, required: true },
    restaurant_location: { type: String, required: true },
    menu: [menuItemSchema]
});

//create the model for the restaurants collection
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// Export the model
export default Restaurant;