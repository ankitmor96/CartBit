import HttpError from "../middleware/HttpError.js"


const checkRole = (...roles) => async (req, res, next) => {
    try {

        if (!req.user) {
            return next(new HttpError("user not login", 400));
        }

        if (!roles.includes(req.user.role)) {
            return next(new HttpError("forbidden access", 403));
        }

        next();

    } catch (error) {
        return next(new HttpError(error.message));
    }
};

export default checkRole;