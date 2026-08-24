import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import HttpError from "../middleware/HttpError.js";
import Order from "../model/order.model.js";
import Payment from "../model/payment.model.js";

const createRazorpayOrder = async (req, res, next) => {
    try {

        const { orderId } = req.body;  // customer order id 

        const order = await Order.findById(orderId);

        if (!order) {
            return next(new HttpError("order data not found", 404));
        }

        if (order.paymentStatus === "paid") {
            return next(new HttpError("please this order is paid successFully", 404));
        }

        const options = {
            amount: order.totalAmount * 100,
            currency: "INR",
            receipt: `receipt_${order._id}`
        };

        const razorpayOrder = await razorpay.orders.create(options);

        const payment = await Payment.create({
            order: order._id,
            razorpayOrderId: razorpayOrder.id,
            amount: order.totalAmount,
            currency: "INR",
            status: "created"
        })

        res.status(200).json({
            success: true,
            message: "Razorpay order created successFully",
            orderId: order._id,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            paymentId: payment._id
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const verifyRazorpayPayment = async (req, res, next) => {
    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return next(new HttpError("Payment verification data is required", 400));
        }

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");



        if (generatedSignature !== razorpay_signature) {

            await Payment.findOneAndUpdate(
                {
                    razorpayOrderId: razorpay_order_id
                },
                {
                    status: "failed" // order model status
                }
            );

            return next(new HttpError("Payment verification failed", 400));
        }

        const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });

        if (!payment) {
            return next(new HttpError("Payment record not found", 404));
        }

        payment.razorpayPaymentId = razorpay_payment_id;

        payment.razorpaySignature = razorpay_signature;

        payment.status = "paid"; 

        await payment.save();

        const order = await Order.findById(
            payment.order
        );

        if (!order) {
            return next(new HttpError("Order data not found", 404));
        }

        order.paymentStatus = "paid";

        await order.save();


        res.status(200).json({
            success: true,
            message: "Payment verified successfully",

            payment: {
                paymentId: payment._id,
                razorpayPaymentId:
                    payment.razorpayPaymentId,
                status: payment.status
            },

            order: {
                orderId: order._id,
                paymentStatus:
                    order.paymentStatus
            }
        });

    } catch (error) {

        return next(new HttpError(error.message, 500));
    }
};

export default { createRazorpayOrder, verifyRazorpayPayment };