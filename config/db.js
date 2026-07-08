import mongoose from "mongoose";
import HttpError from "../middleware/HttpError.js";


// create connect db function connect mongodb URI by .env
const connectDB = async()=>{
    try{

        // dynamiclly ingect uri by .env
        const connect = await mongoose.connect(process.env.MONGO_URI); 

        console.log(process.env.MONGO_URI);

        console.log("mongodb connect successFully");

    }catch(error){
       console.log(error.message);
    }
};


// export connectdb file
export default connectDB;