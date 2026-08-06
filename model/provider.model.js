import mongoose from "mongoose";
import cloudinary from "../config/cloudinary";

const providerSchema = new mongoose.Schema({

    ownerName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    restaurants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Restaurant",
            required:true
        },
    ],

    documents:{
        type:String,
        required:true
    },

    cloudinary_id:{
        type:String,
        required:true 
    },

    bankAccountNumber:{
        type:String,
        required:true
    },

    isVerified:{
        type:Boolean,
        default:false
    },
},

{
    timestamps:true,
    toJSON:{ virtuals:true},
    toObject:{virtuals:true},
},

);

const Provider = mongoose.model("Provider", providerSchema);

export default Provider;