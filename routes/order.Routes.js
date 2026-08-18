import express from "express";
import Order from "../model/order.model.js";
import auth from "../middleware/auth.js";
import orderController from "../controller/order.controller.js";

const router = express.Router();

router.post("/addOrder" , auth , orderController.addOrder);

export default router;

