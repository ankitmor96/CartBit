import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
        required:true 
    },

    razorpayOrderId:{
        type:String,
        required:true
    },

    razorpayPaymentId:{
        type:String
    },

    razorpaySignature:{
        type:String,
    },

    amount:{
        type:Number,
        required:true 
    },

    cuurency:{
        type:String,
        default:"INR"
    },

    status:{
        type:String,
        enum:[
            "created",
            "paid",
            "failed"
        ],
        default: "created"
    },

    method:{
        type:String 
    },

},
{
    timestamps:true,
},
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;