import mongoose from "mongoose";
import HttpError from "../middleware/HttpError.js";

const connectDB = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);

        console.log(process.env.MONGO_URI);

        console.log("mongodb connect successFully");

    }catch(error){
       console.log(error.message);
    }
};

export default connectDB;