import express from 'express';
import {listRestaurants, getRestaurantBySlug, getRestaurantMenu} from "../controllers/restaurantController.js";

const restaurantRouter = express.Router();

restaurantRouter.get("/", listRestaurants);
restaurantRouter.get("/:restaurantId", getRestaurantBySlug);
restaurantRouter.get("/:restaurantId/menu", getRestaurantMenu);

export default restaurantRouter;
