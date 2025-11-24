import express from "express";
import authUser from "../middlewares/authUser.js";
import { requirePerm } from "../middlewares/checkPerms.js";
import {listAvailableOrders, claimOrder, myWork} from "../controllers/orderController.js";

const retrieverRouter = express.Router();

retrieverRouter.use(authUser, requirePerm("retriever"));

retrieverRouter.get("/orders/available", listAvailableOrders);
retrieverRouter.post("/orders/:id/claim", claimOrder);
retrieverRouter.get("/my-work", myWork);

export default retrieverRouter;