import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";



const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        Required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    restaurantName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    providerName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider",
        required: true
    },
    FoodType: {
        type: String,
        enum: ["veg", "non-veg"],
        default: "veg"
    },
    FoodImage: [{
        type: String,
        required: true
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    cloudinary_id: [{
        type: String,
        required: true
    }],
    preparingTime: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true,
    },
);

const Food = mongoose.model("Food", FoodSchema);

export default Food;