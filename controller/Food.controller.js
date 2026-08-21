import Food from "../model/Food.model.js";
import HttpError from "../middleware/HttpError.js";
import cloudinary from "../config/cloudinary.js";
import sendMail from "../utils/SendMail.js";
import User from "../model/user.model.js";
import Category from "../model/category.model.js";
import auditLogger from "../middleware/auditLogger.js";
import Provider from "../model/provider.model.js";


const addFood = async (req, res, next) => {
    try {


        const { name, price, description, restaurantName, providerName, category, FoodType, preparingTime } = req.body;

        if (!req.files || req.files.length === 0) {
            return next(new HttpError("Food image is required", 400));
        }

        const newFood = await Food.create({
            name,
            price,
            description,
            restaurantName,
            providerName,
            category,
            preparingTime,
            FoodImage: req.files.map((field) => field.path),
            cloudinary_id: req.files.map((field) => field.filename)
        });

        if (!newFood) {
            return next(new HttpError("new food data not found", 404));
        }

        const foodPopulate = await newFood.populate([
            {
                path: "restaurantName",
                select: "restaurantName"
            },
            {
                path: "providerName",
                select: "name email"
            },
            {
                path: "category",
                select: "name"
            }
        ]);

        await auditLogger({
            action: "FOOD_ADD",
            performedBy: req.user._id,
            module: "Food",
            targetId: newFood._id,
            ip: req.ip,
            userAgent: req.get("User-Agent")
        });

        await sendMail({
            to: req.user.email,
            name: req.user.name,
            email: req.user.email,
            itemName: newFood,
            action: "FOOD_ADDED"
        });

        res.status(201).json({
            success: true,
            message: "new Food add successFully",
            newFood
        });
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const getAllFood = async (req, res, next) => {
    try {

        let {
            page = 1,
            limit = 10,
            name,
            price,
            preparingTime,
            category,
            search,
            sort = "createdAt",
            order = "desc"
        } = req.query;

        page = Number(page);

        limit = Number(limit);

        const filter = {};

        if (name) {
            filter.name = name;
        }

        if (price) {
            filter.price = price;
        }

        if (preparingTime) {
            filter.preparingTime = preparingTime;
        }

        if (category) {
            filter.category = category;
        }

        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            }
        }

        const sortOption = {

            [sort]: order === "asc" ? 1 : -1

        }

        const totalFood = await Food.countDocuments(filter);

        const foods = await Food
            .find(filter)
            .select("name description -_id")
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(limit)
            .lean()


        if (!foods || foods.length === 0) {
            return res.status(404).json({
                success: true,
                message: "food data not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "All food data fetched",
            foods,
            totalFood: totalFood,
            totalPage: Math.ceil(totalFood / limit),
            currentPage: page
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const updateFood = async (req, res, next) => {
    try {

        const id = req.params.id;

        const food = await Food.findById(id);

        if (!food) {
            return next(new HttpError("food not found", 404));
        }

        const updates = Object.keys(req.body);

        let allowedFields = [
            "name",
            "price",
            "description",
            "category",
            "FoodType",
            "preparingTime",
            "isAvailable"
        ];

        if (req.user.role === "admin") {
            allowedFields = [...allowedFields, "isVerified"];
        }

        const isValidUpdates = updates.every((field) =>
            allowedFields.includes(field));

        if (!isValidUpdates) {
            return next(new HttpError("updates not found", 400));
        }

        updates.forEach((update) => {
            food[update] = req.body[update];
        });

        if (req.files && req.files.length !== 0) {
            if (food.cloudinary_id && food.cloudinary_id.length !== 0) {
                for (const cloudinaryId of food.cloudinary_id) {
                    await cloudinary.uploader.destroy(cloudinaryId, {
                        resource_type: "raw"
                    });

                }
            }

            food.FoodImage = req.files.map((file) => file.path);

            food.cloudinary_id = req.files.map((file) => file.filename);

        }

        await food.save();

        await auditLogger({
            action: "FOOD_UPDATED",
            performedBy: req.user._id,
            module: "Food",
            targetId: food._id,
            ip: req.ip,
            userAgent: req.get("User-Agent")
        });

        res.status(200).json({
            success: true,
            message: "food update successFully",
            food // display auth login user
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const DeleteFood = async (req, res, next) => {
    try {

        const id = req.params.id;

        const food = await Food.findById(id);

        if (!food) {
            return next(new HttpError("food data not found", 404));
        }

        const provider = await Provider.findById(food.providerName);

        if (!provider) {
            return next(new HttpError("provider data not found", 404));
        }

        const owner = await User.findById(provider.ownerName);

        if (!owner) {
            return next(new HttpError("provider owner not found", 404));
        }

        if (owner.role !== "admin") {
            return next(new HttpError("only provider owner with user admin can delete data", 404));
        }

        if (food.cloudinary_id && food.cloudinary_id.length !== 0) {
            for (const cloudinaryId of food.cloudinary_id) {
                await cloudinary.uploader.destroy(cloudinaryId, {
                    resource_type: "raw"
                });
            }
        }

        await auditLogger({
            action: "FOOD_DELETED",
            performedBy: req.user._id,
            module: "Food",
            targetId: food._id,
            ip: req.ip,
            userAgent: req.get("User-Agent")
        });

        await sendMail({
            to: req.user.email,
            name: req.user.name,
            email: req.user.email,
            itemName: food.name,
            action: "FOOD_DELETED"
        });

        await food.deleteOne();

        res.status(200).json({
            success: true,
            message: " food delete successFully ",
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

export default { addFood, getAllFood, updateFood, DeleteFood };
