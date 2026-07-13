import HttpError from "../middleware/HttpError.js";
import User from "../model/user.model.js";


// create new suer
const add = async (req, res, next) => {
    try {
        const { name, email, password, phone, address, role } = req.body; // called by req.body

        const newUser = new User({  //create user 
            name,
            email,
            password,
            phone,
            address
        });

        const alreadyUser = await User.findOne({ email });// check email id

        if (alreadyUser) {
            return next(new HttpError("This email is already login", 404));
        }

        await newUser.save(); // save new user

        res.status(201).json({
            success: true,
            message: "new user create successFully",
            data: newUser // display new user information
        });
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const getAll = async (req, res, next) => {
    try {
        const user = await User.find({});

        if (!user) {
            return next(new HttpError("user data not found", 404));
        }

        res.status(201).json({
            success: true,
            data: user // display all user
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

// user login by email,password
const login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        const userLogin = await User.findByCredentials(email, password);


        if (!userLogin) {
            return next(new HttpError("please check details", 400));
        }

        const token = await userLogin.generateAuthToken();

        res.status(200).json({
            success: true,
            message: "new user create successFully",
            data: userLogin , // display login user
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

//user auth login
const authLogin = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            return next(new HttpError("auth user is not found", 404));
        }

        const token = await user.generateAuthToken();

        res.status(200).json({
            success: true,
            message: "new user create successFully",
            user // display auth login user
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const update = async (req, res, next) => {
    try {

        const user = req.user;

        const updates = Object.keys(req.body);

        const allowedFields = ["name", "password", "phone", "address"];

        const isValidUpdates = updates.every((field) =>
            allowedFields.includes(field));

        if (!isValidUpdates) {
            return next(new HttpError("updates not found", 400));
        }

        updates.forEach((update) => {
            user[update] = req.body[update];
        });

        await user.save();

        res.status(200).json({
            success: true,
            message: "user update successFully",
            user // display auth login user
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

// auth logOut user
const logOut = async (req, res, next) => {
    try {
        req.user.tokens = req.user.tokens.filter((t) => t.token !== req.token);

        await req.user.save();

        res.status(200).json({
            success: true,
            message: "logout successFully",

        });
    } catch (error) {
        return next(HttpError(error.message, 500));
    }
};

const logOutAll = async (req, res, next) => {
    try {

        req.user.tokens = [];

        req.user.save();

        res.status(200).json({
            success: true,
            message: "logoutAll successFully",

        });
    }catch(error){
        return next(new HttpError(error.message,500));
    }
};

const deleteUser = async(req,res,next)=>{
    try{
        const user = req.user;

        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: "delete successFully",

        });
    }catch(error){
        return next(new HttpError(error.message,500));
    }
};



// export controller
export default { add, getAll, login, authLogin, update, logOut , logOutAll , deleteUser };