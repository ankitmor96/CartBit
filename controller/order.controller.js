import Order from "../model/order.model.js";
import HttpError from "../middleware/HttpError.js";
import Food from "../model/Food.model.js";

const addOrder = async (req, res, next) => {
    try {

        const { address, items, restaurantName, phone } = req.body;

        const customerName = req.user._id;

        console.log(customerName);

        const foodIds = items.map((item) => item.food);

        const foods = await Food.find({
            _id: { $in: foodIds }
        });

        console.log(foodIds);

        let totalAmount = 0;

        const orderItems = items.map((item) => {

            const foodFound = foods.find((food) =>
                food._id.toString() === item.food.toString()
            );

            console.log(foodFound);

            const itemsTotal = foodFound.price * item.qty;
            totalAmount += itemsTotal;

            return {
                food: foodFound._id,
                qty: item.qty
            }
        });

        const newOrder = await Order.create({
            customerName,
            address,
            items: orderItems,
            restaurantName,
            phone,
            totalAmount
        });

        const orderPopulate = await newOrder.populate([
            { path: "customerName", select: "name email phone" },

            { path: "items.food", select: "name" },

            { path: "restaurantName", select: "restaurantName phone" }
        ]);

        res.status(201).json({
            success: true,
            message: "new order data add successFully",
            orderPopulate
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

export default { addOrder };