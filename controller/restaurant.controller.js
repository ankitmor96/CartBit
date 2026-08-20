import cloudinary from "../config/cloudinary.js";
import HttpError from "../middleware/HttpError.js";
import restaurantModel from "../model/restaurant.model.js";
import sendMail from "../utils/SendMail.js";
import auditLogger from "../middleware/auditLogger.js";

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
            restaurantImage: req.file.path,
            cloudinary_id: req.file.filename,
            owner: req.user._id
        });

        await auditLogger({
            action: "RESTAURANT_ADD",
            performedBy: req.user._id,
            module: "Restaurant",
            targetId: newRestaurant._id,
            ip: req.ip,
            userAgent: req.get("User-Agent")
        });

        await sendMail({
            to: req.user.email,
            name: req.user.name,
            email: req.user.email,
            itemName: newRestaurant.restaurantName,
            action: "RESTAURANT_ADDED"
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

        let {
            page = 1,
            limit = 10,
            isOpen,
            search,
            city,
            sort = "createdAt",
            order = "desc",
        } = req.query;

        page = Number(page);

        limit = Number(limit);

        const filter = {};

        if (search) {
            filter.restaurantName = {
                $regex: search,
                $options: "i",
            };
        }

        if (city) {
            filter.city = city;
        }

        if (isOpen !== undefined) {
            filter.isOpen = isOpen === "true";
        }

        const sortOption = {
            [sort]: order === "asc" ? 1 : -1
        };

        const totalRestaurant = await restaurantModel.countDocuments(filter);

        const restaurants = await restaurantModel
            .find(filter)
            .populate("owner", "name email address -_id")
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        if (restaurants.length === 0) {
            res.status(404).json({
                success: true,
                message: "restaurant data not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "restaurants data fetched",
            totalRestaurant: totalRestaurant,
            totalPages: Math.ceil(totalRestaurant / limit),
            currentPage: page,
            restaurants
        });


    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const getMyRestaurant = async (req, res, next) => {
    try {

        const restaurants = await restaurantModel.findOne({
            owner: req.user._id
        });

        if (restaurantModel.length === 0) {
            return next(new HttpError("restaurant not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "user Restaurant data fetched successFully",
            data: restaurants
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

        await auditLogger({
            action: "RESTAURANT_UPDATED",
            performedBy: req.user._id,
            module: "Restaurant",
            targetId: Restaurant._id,
            ip: req.ip,
            userAgent: req.get("User-Agent")
        });

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

        await auditLogger({
            action: "RESTAURANT_DELETED",
            performedBy: req.user._id,
            module: "Restaurant",
            targetId: Restaurant._id,
            ip: req.ip,
            userAgent: req.get("User-Agent")
        });

        await Restaurant.deleteOne();


        await sendMail({
            to: req.user.email,
            name: req.user.name,
            email: req.user.email,
            itemName: newRestaurant.restaurantName,
            action: "RESTAURANT_DELETED"
        });

        res.status(200).json({
            success: true,
            message: "Restaurant delete successFully"
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

export default { add, getAll, getMyRestaurant, updateRestaurant, deleteRestaurant };