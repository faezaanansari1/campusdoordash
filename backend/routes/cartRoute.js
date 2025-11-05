import express from "express";
import authUser from "../middlewares/authUser.js";
import { getCart, addItem, updateItemQty, removeItem, clearCart } from "../controllers/cartController.js";

const cartRouter = express.Router();

// all cart routes require login
router.use(authUser);               

router.get("/", getCart);
router.post("/items", addItem);
router.put("/items/:cartItemId", updateItemQty);
router.delete("/items/:cartItemId", removeItem);
router.delete("/", clearCart);

export default cartRouter;