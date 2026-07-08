import mongoose from "mongoose";
import HttpError from "../middleware/HttpError.js";
import bcrypt from "bcryptjs";


// create user schema and This structure
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: ((value) => {  // check password
            if (value.toLowerCase() === "password") {
                return next(new HttpError("password can not use password key word", 401));
            }
        }),
    },
    phone:{
       type:String,
       required:true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["customer", "admin", "provider"],
        default: "customer"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
}, 
{
    timestamps:true,
},
);

// user password bcrypt.hash ---- like #####
userSchema.pre("save" , async function(){

    const user = this;

    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 10);
    }
});

userSchema.statics.findByCredentials = async function(email,password){

    const user = await this.findOne({email});

    if(!user){
        throw new Error("unable to login");
    }

    const isModified = await bcrypt.compare(password, user.password);

    if(!isModified){
       throw new Error("unable to login");
    }

    return user;

};


const User = mongoose.model("User" , userSchema);

// export user schema  
export default User;