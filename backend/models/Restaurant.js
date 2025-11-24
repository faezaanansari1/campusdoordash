import mongoose from "mongoose";

//Defines Restaurant Schema
const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    image_url: { type: String, required: true },
    description: { type: String, default: "" },
    rating: { type: Number, min: 0, max: 5, default: 0},
    location: { type: String, required: true, trim: true },

    hours: {
        monday: { open: String, close: String },
        tuesday: { open: String, close: String },
        wednesday: { open: String, close: String },
        thursday: { open: String, close: String },
        friday: { open: String, close: String },
        saturday: { open: String, close: String },
        sunday: { open: String, close: String },
    },
}, { timestamps: true });

//create the model for the restaurants collection
const Restaurant = mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);

// Export the model
export default Restaurant;