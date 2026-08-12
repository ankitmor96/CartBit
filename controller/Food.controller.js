import Food from "../model/Food.model.js";
import HttpError from "../middleware/HttpError.js"


const addFood = async (req, res, next) => {
    try {


        const { name, price, descreption, restaurantName, providerName, FoodType, preparingTime, isAvailable, isVerified } = req.body;

        if(!req.files || req.files.length === 0){
            return next(new HttpError("Food image is required",400));
        }

        const newFood = await Food.create({
            name,
            price,
            descreption,
            restaurantName,
            providerName,
            FoodType,
            preparingTime,
            isAvailable,
            isVerified,
            image: req.files.map((field) => field.path),
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
    }catch(error){
        return next(new HttpError(error.message,500));
    }
};

export default {addFood};
