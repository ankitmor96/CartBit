import cloudinary from "../config/cloudinary.js";
import HttpError from "../middleware/HttpError.js";
import restaurantModel from "../model/restaurant.model.js";

const add = async (req, res, next) => {
    try {

        const { restaurantName, description, address, state, city, phone, openingTime, closingTime, isOpen } = req.body;


        const newRestaurant = await restaurantModel.create({
            restaurantName,
            description,
            address,
            state,
            city,
            phone,
            openingTime,
            closingTime,
            isOpen,
            restaurantImage: req.file?.path || null,
            cloudinary_id: req.file?.filename || null,
            owner: req.user._id
        });

        res.status(201).json({
            success: true,
            message: "new restaurant add successFully",
            newRestaurant
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const getAll = async (req, res, next) => {
    try {

        const Restaurant = await restaurantModel.find({});

        if (Restaurant.length === 0) {
            return next(new HttpError("Restaurant not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "all restaurant data fetched successFully",
            Restaurant
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};


const updateRestaurant = async (req, res, next) => {
    try {

        const TargetRestaurant = req.params.id || req.user._id;

        const Restaurant = await restaurantModel.findById(TargetRestaurant);

        if (!Restaurant) {
            return next(new HttpError("Restaurant not found", 404));
        }

        const updates = Object.keys(req.body);

        let allowedFields = ["restaurantName", "description", "address", "state", "city", "phone", "openingTime", "closingTime"];

        if (req.user.role === "admin") {
            allowedFields = [...allowedFields, "isOpen"];
        }

        const isValidUpdates = updates.every((field) =>
            allowedFields.includes(field));

        if (!isValidUpdates) {
            return next(new HttpError("please allowed field is updated", 404));
        }

        if (req.user.role !== "admin" &&
            Restaurant.owner.toString() !== req.user._id.toString()) {
            return next(new HttpError("you are not allowed update this Restaurant", 404));
        }


        if (req.file) {
            if (Restaurant.cloudinary_id) {
                await cloudinary.uploader.destroy(Restaurant.cloudinary_id);
            }

            Restaurant.restaurantImage = req.file.path;
            Restaurant.cloudinary_id = req.file.filename;
        }

        updates.forEach((update) => {
            Restaurant[update] = req.body[update]
        });

        await Restaurant.save();

        res.status(200).json({
            success: true,
            message: "Restaurant update successFully",
            data: Restaurant
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const deleteRestaurant = async (req, res, next) => {
    try {

        const id = req.params.id || req.user._id;

        const Restaurant = await restaurantModel.findById(id);

        if (!Restaurant) {
            return next(new HttpError("Restaurent id not found", 404));
        }

        if (Restaurant.owner.toString() !== req.user._id.toString()) {
            return next(new HttpError("you are not allowed to this restaurant", 404));
        }

        if (req.file) {
            if (req.cloudinary_id) {
                cloudinary.uploader.destroy(Restaurant.cloudinary_id);
            }
        }

        await Restaurant.deleteOne();

        res.status(200).json({
            success: true,
            message: "Restaurant delete successFully"
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

export default { add, getAll, updateRestaurant, deleteRestaurant };