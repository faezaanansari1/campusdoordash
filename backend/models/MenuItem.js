import mongoose from "mongoose";

//Defines the menu item schema
const menuItemSchema = new mongoose.Schema({
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true, index: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image_url: { type: String, default: "" },
    calories: { type: Number, default: null, min: 0 },
    description: { type: String, default: "" },
}, { timestamps: true });

menuItemSchema.index({ restaurant: 1, name: 1 }, { unique: true });

const MenuItem = mongoose.models.MenuItem || mongoose.model("MenuItem", menuItemSchema); 

export default MenuItem;