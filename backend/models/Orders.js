import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 }
}, { _id: false });

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    retriever: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    //we can assign this later when someone picks up the delivery.

    items: { type: [orderItemSchema], required: true },

    subtotal: { type: Number, required: true, min: 0 },
    tax: { type: Number, required: true, min: 0 },
    deliveryFee: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
    dropOffLocation: { type: String, required: true },
    dropOffDetails: { type: String, default: "", trim: true }, //any special instructions like extra sauce or stuff like that

    status: {
        type: String,
        enum: [
            "pending",  //user placed order and is waiting for the restaurant
            "confirmed",    //restaurant accepted the order
            "preparing",    //restaurant is preparing the order
            "picked_up",    //retriever picked up the order
            "delivering",
            "delivered",
            "cancelled"
        ],
        default: "pending"
    }
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;

