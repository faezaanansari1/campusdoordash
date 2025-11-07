import mongoose from "mongoose";

//Define Cart Schema
const cartSchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }
});

//Define User schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    permission: { type: String, default: 'user' }, //I just made the default permission a user
    created_at: { type: Date, default: () => new Date() },
    last_login: { type: Date, default: null },
    phone_number: { type: String, required: true },
    user_id: { type: String, required: true },
    cart: { type: [cartSchema], default: [] } //embedded cart array
});




const User = mongoose.models.user || mongoose.model('User', userSchema);
//This is to use the functions separately in other files
//exporting the functions

export default User;
