import mongoose from "mongoose";
import HttpError from "../middleware/HttpError.js";
import bcrypt from "bcryptjs";

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
        validate: ((value) => {
            if (value.toLowerCase() === "password") {
                return next(new HttpError("password can not use password key word", 401));
            }
        }),
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


userSchema.pre("save" , async function(){

    const user = this;

    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 10);
    }
});

const User = mongoose.model("User" , userSchema);

export default User;