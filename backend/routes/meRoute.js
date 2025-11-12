import express from "express";
import authUser from "../middlewares/authUser.js";
import { getMe, updateMe, changeMyPassword } from "../controllers/profileController.js";

const profileRouter = express.Router();

profileRouter.use(authUser);

profileRouter.get("/", getMe);
profileRouter.patch("/", updateMe);           
profileRouter.patch("/password", changeMyPassword);

export default profileRouter;
