import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";

const CategorySchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        enum: [
            "Pizza",
            "Burger",
            "Gujarati",
            "Punjabi",
            "South Indian",
            "Chinese",
            "Italian",
            "Mexican",
            "Dessert",
            "Beverages",
            "Fast Food",
            "Street Food",
            "Salad",
            "Sandwich",
            "Biryani"
        ] 
    },
    description:{
        type:String,
        required:true
    },
    CategoryImage:[{
        type:String,
        required:true 
    }],
    cloudinary_id:[{
        type:String,
        required:true 
    }],
},
{
    timestamps:true
},
);

const Category = mongoose.model("Category" , CategorySchema);

export default Category;