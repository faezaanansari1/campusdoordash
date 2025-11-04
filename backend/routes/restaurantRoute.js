import express from 'express';
import {listRestaurants, getRestaurantBySlug, getRestaurantMenu} from "../controllers/restaurantController.js";

const restaurantRouter = express.Router();

restaurantRouter.get("/", listRestaurants);
restaurantRouter.get("/:slug", getRestaurantBySlug);
restaurantRouter.get("/:slug/menu", getRestaurantMenu);

export default restaurantRouter;
