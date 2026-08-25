
import express from "express";
import paymentController from "../controller/payment.controller.js";
import { authLimiter } from "../middleware/RateLimiter.js";

const router = express.Router();

router.post("/createRazorpayOrder", authLimiter ,paymentController.createRazorpayOrder);

router.post("/verifyRazorpayPayment", paymentController.verifyRazorpayPayment);

export default router;