import HttpError from "../middleware/HttpError.js";
import User from "../model/user.model.js";

const add = async(req ,res ,next)=>{
    try{
        const {name,email,password,address,role,isverified} = req.body;

        const newUser = new User({
            name,
            email,
            password,
            address
        });

        const alreadyUser = await User.findOne({email});

        if(alreadyUser){
            return next (new HttpError("This email is already login",404));
        }

        await newUser.save();

        res.status(201).json({
            success:true,
            message:"new user create successFully",
            data:newUser
        });
    }catch(error){
        return next(new HttpError(error.message,500));
    }
};

export default {add};