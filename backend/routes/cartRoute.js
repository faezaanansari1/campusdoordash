import express from "express";
import authUser from "../middlewares/authUser.js";
import { getCart, addItem, updateItemQty, removeItem, clearCart } from "../controllers/cartController.js";

const cartRouter = express.Router();

// all cart routes require login
cartRouter.use(authUser);

cartRouter.get("/getCart", getCart);
cartRouter.post("/addItem", addItem);
cartRouter.put("/updateItemQty/:cartItemId", updateItemQty);
cartRouter.delete("/removeItem/:cartItemId", removeItem);
cartRouter.delete("/", clearCart);

export default cartRouter;