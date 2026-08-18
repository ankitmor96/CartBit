import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    customerName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    items: [
        {
            food: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Food",
                required: true
            },
            qty: {
                type: Number,
                required: true,
                min: 1,
                default: 1
            }
        }
    ],
    restaurantName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    phone: {
        type: String,
        required: true,
        trim:true
    },
    totalAmount: {
        type: Number,
        required: true,
        min:0
    },
    status: {
        type:String,
        enum: [
            "pending",
            "confirmed",
            "preparing",
            "ready",
            "out_for_delivery",
            "delivered",
            "cancelled",
        ],
        default: "pending",
    },
    paymentStatus: {
        type: String,
        enum: [
            "pending",
            "paid",
            "failed",
            "refunded",
        ],
        default:"pending",
    },
    paymentMethod:{
        type:String,
        enum:[
            "cod",
            "online"
        ],
        default: "cod",
    },
},
    {
        timestamps: true,
    },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;