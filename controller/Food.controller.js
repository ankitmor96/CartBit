import Food from "../model/Food.model.js";
import HttpError from "../middleware/HttpError.js"


const addFood = async (req, res, next) => {
    try {


        const { name, price, description, restaurantName, providerName, category, FoodType, preparingTime, isAvailable, isVerified } = req.body;

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
            res.status(404).json({
                success: true,
                message: "food data not found"
            });
        }

        res.status(200).json({
            success:true,
            message:"All food data fetched",
            foods,
            totalFood : totalFood,
            totalPage : Math.ceil(totalFood/limit),
            currentPage : page
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

export default { addFood, getAllFood };
