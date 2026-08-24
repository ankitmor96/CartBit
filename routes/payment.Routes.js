
import express from "express";
import paymentController from "../controller/payment.controller.js";

const router = express.Router();

router.post("/createRazorpayOrder", paymentController.createRazorpayOrder);

router.post("/verifyRazorpayPayment", paymentController.verifyRazorpayPayment);

export default router;