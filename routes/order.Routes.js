import express from "express";
import Order from "../model/order.model.js";
import auth from "../middleware/auth.js";
import orderController from "../controller/order.controller.js";
import checkRole from "../middleware/checkRole.js";
import validate from "../middleware/validate.js";
import OrderSchema from "../validation/order.Schema.js";
import {orderUpdateSchema} from "../validation/order.Schema.js"
import { authLimiter } from "../middleware/RateLimiter.js";

const router = express.Router();

router.post("/addOrder" , auth , authLimiter , checkRole("customer"), validate(OrderSchema), orderController.addOrder);

router.get("/getAllOrder" , auth , checkRole("admin") , orderController.getAllOrder);

router.patch("/updateOrder/:id", auth , checkRole("customer"), validate(orderUpdateSchema) , orderController.updateOrder);

router.delete("/deleteOrder/:id" , auth , checkRole("customer") , orderController.deleteOrder);

export default router;

