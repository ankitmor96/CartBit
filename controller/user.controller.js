import HttpError from "../middleware/HttpError.js";
import User from "../model/user.model.js";


// create new suer
const add = async(req ,res ,next)=>{
    try{
        const {name,email,password,phone,address,role} = req.body; // called by req.body

        const newUser = new User({  //create user 
            name,
            email,
            password,
            phone,
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

const login = async(req,res,next)=>{
    try{

        const {email,password} = req.body;

        const userLogin = await User.findByCredentials(email , password);

        if(!userLogin){
            return next(new HttpError("please check details",400));
        }

         res.status(200).json({
            success:true,
            message:"new user create successFully",
            data:userLogin
        });

    }catch(error){
      return next(new HttpError(error.message,500));
    }
};


// export controller
export default {add,login};