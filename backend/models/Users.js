import mongoose from "mongoose";

//Define Cart Schema
const cartSchema = new mongoose.Schema({
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, default: 1, min: 1 },
    options: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { _id: false });

//Define User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    permission: { type: String, enum: ["user", "admin", "retriever"], default: 'user' }, //I just made the default permission a user
    phoneNumber: { type: String, required: true, trim: true },
    lastLogin: { type: Date, default: null },    
    cart: { type: [cartSchema], default: [] }, //embedded cart array
    rating: { type: Number, min: 0, max: 5, default: 5 },
}, {timestamps: true});



const User = mongoose.models.User || mongoose.model('User', userSchema);
//This is to use the functions separately in other files
//exporting the functions

export default User;