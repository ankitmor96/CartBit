import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phone:{
        type:String,
        required:true 
    },
    openingTime:{
        type:String,
        required:true 
    },
    closingTime:{
        type:String,
        required:true 
    },
    isOpen:{
        type:Boolean,
        required:true 
    },
    restaurantImage:{
        type:String,
        required:true 
    },
    cloudinary_id:{
        type:String,
        required:true 
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",  // reference by user model get user id
        required:true 
    },

},
{
    timestamps:true,
},
);

const restaurantModel = mongoose.model("restaurant" , restaurantSchema);

export default restaurantModel;