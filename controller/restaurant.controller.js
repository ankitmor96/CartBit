import HttpError from "../middleware/HttpError.js";
import restaurantModel from "../model/restaurant.model.js";

const add = async (req, res, next) => {
    try {

        const { restaurantName, description, address, state, city, phone, openingTime, closingTime, isOpen } = req.body;

        console.log(req.file);

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

    } catch(error) {
        return next(new HttpError(error.message, 500));
    }
};

export default {add};