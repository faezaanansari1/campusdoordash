import mongoose from "mongoose";

const deliveryHistorySchema = new mongoose.Schema({
    retriever: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    deliveredAt: { type: Date, default: () => new Date() }
}, { timestamps: true});

const DeliveryHistory = mongoose.models.DeliveryHistory || mongoose.model("DeliveryHistory", deliveryHistorySchema);

export default DeliveryHistory;