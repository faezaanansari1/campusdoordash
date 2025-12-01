import express from "express";
import authUser from "../middlewares/authUser.js";
import requirePerm from "../middlewares/checkPerms.js";
import {createRestaurant,updateRestaurant,deleteRestaurant,createMenuItem,updateMenuItem,deleteMenuItem,listUsers,setUserRole,
  removeUser,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.use(authUser, requirePerm("admin"));
adminRouter.post("/restaurants", createRestaurant);
adminRouter.patch("/restaurants/:id", updateRestaurant);
adminRouter.delete("/restaurants/:id", deleteRestaurant);

// ----- MENU ITEM MANAGEMENT -----
adminRouter.post("/menu-items", createMenuItem);
adminRouter.patch("/menu-items/:id", updateMenuItem);
adminRouter.delete("/menu-items/:id", deleteMenuItem);

// ----- USER MANAGEMENT -----

adminRouter.get("/users", listUsers);
adminRouter.patch("/users/:id/permission", setUserRole);
adminRouter.delete("/users/:id", removeUser);

export default adminRouter;