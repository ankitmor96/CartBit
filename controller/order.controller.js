import Order from "../model/order.model.js";
import HttpError from "../middleware/HttpError.js";
import Food from "../model/Food.model.js";
import auditLogger from "../middleware/auditLogger.js";

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

        await auditLogger({
            action: "ORDER_ADD",
            performedBy: req.user._id,
            module: "Order",
            targetId: newOrder._id,
            ip: req.ip,
            userAgent: req.get("User-Agent")
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

const getAllOrder = async (req, res, next) => {
    try {

        let {
            page = 1,
            limit = 10,
            status,
            paymentStatus,
            paymentMethod,
            sort = "createdAt",
            order = "desc"
        } = req.query;

        page = Number(page);

        limit = Number(limit);

        const filter = {};

        if (status) {
            filter.status = status;
        }

        if (paymentStatus) {
            filter.paymentStatus = paymentStatus;
        }

        if (paymentMethod) {
            filter.paymentMethod = paymentMethod;
        }

        const sortOption = {
            [sort]: order === "asc" ? 1 : -1
        }

        const totalOrders = await Order.countDocuments(filter);

        const orders = await Order
            .find(filter)
            .populate("customerName", "name email phone")
            .populate("items.food", "name price")
            .populate("restaurantName", "restaurantName phone")
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(limit)
            .lean()

        if (orders.length === 0) {
            return next(new HttpError("order data not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "orders data fetched successFully",
            totalOrders,
            totalPages: Math.ceil(totalOrders / limit),
            currentPage: page,
            limit,
            orders
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const updateOrder = async (req, res, next) => {
    try {

        const id = req.params.id;

        const order = await Order.findById(id);

        if (!order) {
            return next(new HttpError("order data not found", 404));
        }

        if (order.status !== "pending") {
            return next(new HttpError("order can not updated after order confirmed", 404));
        }

        const updates = Object.keys(req.body);

        const allowedFields = ["address", "phone", "items"];

        const isValidUpdates = updates.every((field) =>
            allowedFields.includes(field));

        if (!isValidUpdates) {
            return next(new HttpError("Invalid updates fields", 400));
        }

        if (req.body.address) {
            order.address = req.body.address;
        }

        if (req.body.phone) {
            order.phone = req.body.phone;
        }

        if (req.body.items) {
            if (!Array.isArray(req.body.items) || req.body.items.length === 0) {
                return next(new HttpError("Items data not found", 400));
            }

            const foodIds = req.body.items.map((item) => item.food);

            const foods = await Food.find({
                _id: { $in: foodIds }
            });

            if (foods.length !== foodIds.length) {
                return next(new HttpError("food data not found", 404));
            }

            let totalAmount = 0;

            const orderItems = req.body.items.map((item) => {
                const foodFound = foods.find((food) => food._id.toString() === item.food.toString());

                if (!foodFound) {
                    throw new Error("food data not found", 400);
                }

                if (!item.qty || item.qty <= 0) {
                    throw new Error("quntity data not found", 400);
                }

                const itemTotal = foodFound.price * item.qty;

                totalAmount += itemTotal;

                return {
                    food: foodFound._id,
                    qty: item.qty
                };
            });

            order.items = orderItems;

            order.totalAmount = totalAmount;

        }

        await order.save();

        await auditLogger({
            action: "ORDER_UPDATED",
            performedBy: req.user._id,
            module: "Order",
            targetId: order._id,
            ip: req.ip,
            userAgent: req.get("User-Agent")
        });

        const orderPopulate = await order.populate([
            {
                path: "customerName", select: "name email phone"
            },
            {
                path: "items.food", select: "name price"
            },
            {
                path: "restaurantName", select: "restaurantName phone"
            }
        ]);

        res.status(200).json({
            success: true,
            message: "order data updated successFully",
            orderPopulate
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const deleteOrder = async (req, res, next) => {
    try {

        const id = req.params.id;

        const order = await Order.findById(id);

        if (!order) {
            return next(new HttpError("order data not found", 400));
        }

        if (order.status !== "pending") {
            return next(new HttpError("order can not updated after order confirmed", 400))
        }

        await auditLogger({
            action: "ORDER_DELETED",
            performedBy: req.user._id,
            module: "Order",
            targetId: order._id,
            ip: req.ip,
            userAgent: req.get("User-Agent")
        });

        await order.deleteOne();

        await Order.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "order delete successFully",
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};



export default { addOrder, getAllOrder, updateOrder, deleteOrder };