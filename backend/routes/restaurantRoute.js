import express from 'express';
import {listRestaurants, getRestaurantById, getRestaurantMenu} from "../controllers/restaurantController.js";

const restaurantRouter = express.Router();

restaurantRouter.get("/", listRestaurants);
restaurantRouter.get("/:restaurantId", getRestaurantById);
restaurantRouter.get("/:restaurantId/menu", getRestaurantMenu);

export default restaurantRouter;
