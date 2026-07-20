import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import HttpError from "../middleware/HttpError.js";

const auth = async function (req, res, next) {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return next(new HttpError("auth header is not defined", 400));
        }

        const token = authHeader.replace("Bearer ", "");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Header:", authHeader);
        console.log("Token:", token);
        console.log("Decoded:", decoded);

        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token,
        });

        console.log("User:", user);

        if (!user) {
            return next(new HttpError("token not found", 400));
        }

        req.user = user;

        req.token = token;

        next();

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

export default auth;