import express from "express";
import authUser from "../middlewares/authUser.js";
import { getCart, addItem, updateItemQty, removeItem, clearCart } from "../controllers/cartController.js";

const cartRouter = express.Router();

// all cart routes require login
cartRouter.use(authUser);

cartRouter.get("/", getCart);
cartRouter.post("/items", addItem);
cartRouter.put("/items/:cartItemId", updateItemQty);
cartRouter.delete("/items/:cartItemId", removeItem);
cartRouter.delete("/", clearCart);

export default cartRouter;