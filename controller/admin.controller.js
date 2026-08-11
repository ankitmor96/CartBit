import HttpError from "../middleware/HttpError.js";
import User from "../model/user.model.js";

const getAll = async(req ,res ,next)=>{
    try{

        const {role,isVerified} = req.query;

        const query = {};

        if(role === "customer"){
            query.role = "customer";
        }

        if(role === "provider"){
            query.role = "provider";
        }

        if(isVerified !== undefined){
            query.isVerified = isVerified === "true";
        }

        const users = await User.find(query);

        if(users.length === 0){
            return next (new HttpError("users not found",404));
        }

        const totalUsers = await User.countDocuments(query);

        res.status(200).json({
            success:true,
            message:"all User data fetched successFully",
            totalUsers,
            users
        });


    }catch(error){
        return next(new HttpError(error.message,500));
    }
};

export default {getAll};