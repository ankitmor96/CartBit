
import HttpError from "../middleware/HttpError.js";
import User from "../model/user.model.js";
import Order from "../model/order.model.js";
import Food from "../model/Food.model.js";
import restaurantModel from "../model/restaurant.model.js";

const getAll = async (req, res, next) => {
    try {

        const { role, isVerified } = req.query;

        const query = {};

        if (role === "customer") {
            query.role = "customer";
        }

        if (role === "provider") {
            query.role = "provider";
        }

        if (isVerified !== undefined) {
            query.isVerified = isVerified === "true";
        }

        const users = await User.find(query);

        if (users.length === 0) {
            return next(new HttpError("users not found", 404));
        }

        const totalUsers = await User.countDocuments(query);

        res.status(200).json({
            success: true,
            message: "all User data fetched successFully",
            totalUsers,
            users
        });


    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const dashBordStatics = async (req, res, next) => {
    try {

        const totalOrder = await Order.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                },
            },

        ]);


        const totalPendingRevenue = await Order.aggregate([
            {
                $match: {
                    status: "pending",
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$totalAmount"
                    }
                }
            }
        ]);

        const totaldeliveredRevenue = await Order.aggregate([
            {
                $match: {
                    status: "delivered"
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$totalAmount"
                    }
                }
            }
        ]);

        const totalCancelledRevenue = await Order.aggregate([
            {
                $match: {
                    status: "cancelled",
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$totalAmount"
                    }
                }
            }
        ]);

        const totalUsers = await User.aggregate([

            {
                $group: {
                    _id: "$role",
                    count: { $sum: 1 }
                },
            }

        ]);

        const totalisVerifiedAdminUser = await User.aggregate([
            {
                $match: {
                    role: "admin",
                    isVerified: true
                }
            },
            {
                $group: {
                    _id: null,
                    totalisVerified: {
                        $sum: 1
                    }
                }
            }
        ]);

        const totalisVerifiedCustomerUser = await User.aggregate([
            {
                $match: {
                    role: "customer",
                    isVerified: true
                }
            },
            {
                $group: {
                    _id: null,
                    totalisVerified: {
                        $sum: 1
                    }
                }
            }
        ]);

        const totalisVerifiedProviderUser = await User.aggregate([
            {
                $match: {
                    role: "provider",
                    isVerified: true
                }
            },
            {
                $group: {
                    _id: null,
                    totalisVerified: {
                        $sum: 1
                    }
                }
            }
        ]);

        const totalFoods = await Food.aggregate([
            {
                $group: {
                    _id: "$FoodType",
                    count: { $sum: 1 }
                }
            }
        ]);

        const totalVegisAvailableFoods = await Food.aggregate([
            {
                $match: {
                    FoodType: "veg",
                    isAvailable: true
                }
            },
            {
                $group: {
                    _id: null,
                    totalisAvailable: {
                        $sum: 1
                    }
                }
            }
        ]);

        const totalNonVegisAvailableFoods = await Food.aggregate([
            {
                $match: {
                    FoodType: "non-veg",
                    isAvailable: false
                }
            },
            {
                $group: {
                    _id: null,
                    totalisAvailable: {
                        $sum: 1
                    }
                }
            }
        ]);

        const totalRestaurant = await restaurantModel.aggregate([
            {
                $group:{
                   _id:"isOpen",
                   count: {$sum:1}
                }
            }
        ]);

        const totalisOpenRestaurant = await restaurantModel.aggregate([
            {
                $match:{
                    isOpen:true
                }
            },
            {
                $group:{
                    _id:null,
                    totalIsOpen:{
                      $sum:1
                    }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: " Dashboard statistics data fetched successFully",
            totalOrder,
            totalPendingRevenue,
            totaldeliveredRevenue,
            totalCancelledRevenue,
            totalUsers,
            totalisVerifiedAdminUser,
            totalisVerifiedCustomerUser,
            totalisVerifiedProviderUser,
            totalFoods,
            totalVegisAvailableFoods,
            totalNonVegisAvailableFoods,
            totalRestaurant,
            totalisOpenRestaurant
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

export default { getAll, dashBordStatics };