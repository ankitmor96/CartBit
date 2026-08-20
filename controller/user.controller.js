import cloudinary from "../config/cloudinary.js";
import auditLogger from "../middleware/auditLogger.js";
import HttpError from "../middleware/HttpError.js";
import User from "../model/user.model.js";
import sendMail from "../utils/SendMail.js";



// create new suer
const add = async (req, res, next) => {
    try {
        const { name, email, password, phone, address, role } = req.body; // called by req.body

        const newUser = new User({  //create user 
            name,
            email,
            password,
            phone,
            address,
            ProfilePic: req.file?.path || null,
            cloudinary_id: req.file?.filename || null,
        });

        const alreadyUser = await User.findOne({ email });// check email id

        if (alreadyUser) {
            return next(new HttpError("This email is already login", 404));
        }

        await newUser.save(); // save new user

        await auditLogger({
            action: "USER_ADD",
            performedBy: newUser._id,
            module: "User",
            targetId: newUser._id,
            ip: req.ip,
            userAgent: req.get("User-Agent")
        });

        await sendMail({
            to: newUser.email,
            name: newUser.name,
            email: newUser.email,
            action: "USER_ADDED"
        });

        res.status(201).json({
            success: true,
            message: "new user create successFully",
            data: newUser // display new user information
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

        await auditLogger({
            action: "USER_LOGIN",
            performedBy: userLogin._id,
            module: "User",
            targetId: userLogin._id,
            ip: req.ip,
            userAgent: req.get("User-Agent")
        });

        res.status(200).json({
            success: true,
            message: "new user create successFully",
            data: userLogin, // display login user
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

        const TargetUser = req.params.id || req.user._id;

        const user = await User.findById(TargetUser);

        if (!user) {
            return next(new HttpError("user not found", 404));
        }

        const updates = Object.keys(req.body);

        let allowedFields = ["name", "phone", "address"];

        if (req.user.role === "admin") {
            allowedFields = [...allowedFields, "isVerified"];
        }

        const isValidUpdates = updates.every((field) =>
            allowedFields.includes(field));

        if (!isValidUpdates) {
            return next(new HttpError("updates not found", 400));
        }

        updates.forEach((update) => {
            user[update] = req.body[update];
        });

        if (req.file) {
            if (user.cloudinary_id) {
                await cloudinary.uploader.destroy(user.cloudinary_id);
            }
            user.ProfilePic = req.file?.path;
            user.cloudinary_id = req.file?.filename;
        }

        await user.save();

        await auditLogger({
            action: "USER_UPDATED",
            performedBy: req.user._id,
            module: "User",
            targetId: user._id,
            ip: req.ip,
            userAgent: req.get("User-Agent")
        });

        res.status(200).json({
            success: true,
            message: "user update successFully",
            user // display auth login user
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const getAll = async (req, res, next) => {
    try {

        let {
            page = 1,
            limit = 10,
            role,
            search,
            sort = "createdAt",
            order = "desc"
        } = req.query;

        page = Number(page);

        limit = Number(limit);

        const filter = {};

        if (role) {
            filter.role = role;
        }

        if (search) {
            filter.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    email: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        const sortOptions = {
            [sort]: order === "asc" ? 1 : -1
        }

        const totalUser = await User.countDocuments(filter);

        const users = await User
            .find(filter)
            .select("name email address -_id")
            .sort(sortOptions)
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        if (users.length === 0) {
            res.status(404).json({
                success: true,
                message: "user data not fund",
            });
        }

        res.status(200).json({
            success: true,
            message: "All user data found",
            totalUser,
            totalPage: Math.ceil(totalUser / limit),
            currentPage: page,
            users
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
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const deleteUser = async (req, res, next) => {
    try {

        const TargetUser = req.params.id || req.user._id;

        const user = await User.findById(TargetUser);

        if (!user) {
            return next(new HttpError("user data not defined", 404));
        }

        await auditLogger({
            action: "USER_DELETED",
            performedBy: req.user._id,
            module: "User",
            targetId: user._id,
            ip: req.ip,
            userAgent: req.get("User-Agent")
        });

        await user.deleteOne();

        await sendMail({
            to: user.email,
            name: user.name,
            email: user.email,
            action: "USER_DELETED"
        });

        res.status(200).json({
            success: true,
            message: "delete successFully",

        });
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};



// export controller
export default { add, getAll, login, authLogin, update, logOut, logOutAll, deleteUser };