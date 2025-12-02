import express from "express";
import authUser from "../middlewares/authUser.js";
import {createOrderFromCart,getMyCurrentOrder,listAvailableOrders,claimOrder,getOrderStatus,getMyOrders,updateOrderStatus} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.use(authUser);

orderRouter.post("/from-cart", createOrderFromCart);
orderRouter.get("/current", getMyCurrentOrder);
orderRouter.get("/available", listAvailableOrders);
orderRouter.get("/mine", getMyOrders);
orderRouter.get("/:id/claim", claimOrder);
orderRouter.get("/:id/status", getOrderStatus);
orderRouter.patch("/:id/status", updateOrderStatus);

export default orderRouter;
