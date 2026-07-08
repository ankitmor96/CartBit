import HttpError from "../middleware/HttpError.js";
import User from "../model/user.model.js";


// create new suer
const add = async(req ,res ,next)=>{
    try{
        const {name,email,password,address,role,isverified} = req.body; // called by req.body

        const newUser = new User({  //create user 
            name,
            email,
            password,
            address
        });

        const alreadyUser = await User.findOne({email});// check email id

        if(alreadyUser){
            return next (new HttpError("This email is already login",404));
        }

        await newUser.save(); // save new user

        res.status(201).json({
            success:true,
            message:"new user create successFully",
            data:newUser // display new user information
        });
    }catch(error){
        return next(new HttpError(error.message,500));
    }
};


// export controller
export default {add};