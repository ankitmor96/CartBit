import mongoose from "mongoose";
import HttpError from "../middleware/HttpError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


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
                throw new Error("password can not use password key word", 401);
            }
        }),
    },
    phone: {
        type: String,
        required: true
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
    ProfilePic: {
        type: String,
    },
    cloudinary_id: {
        type: String,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        },
    ],
},
    {
        timestamps: true,
    },
);

// user password bcrypt.hash ---- like #####
userSchema.pre("save", async function () {

    const user = this;

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});


// find by email, password in user details
userSchema.statics.findByCredentials = async function (email, password) {

    const user = await this.findOne({ email });

    if (!user) {
        throw new Error("unable to login");
    }

    const isModified = await bcrypt.compare(password, user.password);

    if (!isModified) {
        throw new Error("unable to login");
    }

    return user;

};

userSchema.methods.generateAuthToken = async function () {

    try {
        const user = this;

        const token = jwt.sign(
            { _id: this._id.toString() },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            },
        );

        if (!token) {
            throw new Error(" auth token not found");
        }

        console.log(token);

        user.tokens = user.tokens.concat({ token });

        await user.save();

        return token;
    } catch (error) {
        throw new Error(error.message);
    }
};

userSchema.methods.toJSON = function () {
    try {

        const user = this;

        const userObject = user.toObject();

        delete userObject.password;

        delete userObject._id;

        // delete userObject.tokens;

        delete userObject.createdAt;

        delete userObject.updatedAt;

        delete userObject.__v;

        return userObject;


    } catch (error) {
        throw new Error(error.message);
    }
};


const User = mongoose.model("User", userSchema);

// export user schema  
export default User;