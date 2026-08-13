import HttpError from "../middleware/HttpError.js";
import Provider from "../model/provider.model.js";
import User from "../model/user.model.js";
import sendMail from "../utils/SendMail.js";
import cloudinary from "../config/cloudinary.js";
import restaurantModel from "../model/restaurant.model.js";


const registerAsProvider = async (req, res, next) => {
    try {

        const Id = req.user._id;

        const user = await User.findById(Id);

        const existingProvider = await Provider.findOne({ ownerName: Id });

        if (existingProvider) {
            return next(new HttpError("This user already existing as provider", 404));
        }

        const { restaurants, bankAccountNumber } = req.body;

        if (!req.files || req.files.length === 0) {
            return next(new HttpError("req file not found", 404));
        }

        const newProvider = await new Provider({
            ownerName: req.user._id,
            restaurants,
            documents: req.files.map((file) => file.path),
            cloudinary_id: req.files.map((file) => file.filename),
            bankAccountNumber,
        });

        user.role = "provider";

        await newProvider.save();

        await user.save();

        await sendMail({
            to: req.user.email,
            name: req.user.name,
            email: req.user.email,
            // itemName: ,
            action: "PROVIDER_ADDED"
        });

        res.status(201).json({
            success: true,
            message: "new Provider add successFully ",
            data: newProvider
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const getAllProvider = async (req, res, next) => {
    try {

        let {

            page = 1,
            limit = 10,
            ownerName,
            restaurants,
            bankAccountNumber,
            search,
            sort = "createdAt",
            order = "desc"
        } = req.query;

        page = Number(page);

        limit = Number(limit);

        const filter = {};

        if (ownerName) {
            filter.ownerName = ownerName;
        }

        if (restaurants) {
            filter.restaurants = restaurants;
        }

        if (bankAccountNumber) {
            filter.bankAccountNumber = bankAccountNumber;
        }

        if (search) {
            const FindRestaurants =
                await restaurantModel.find({
                    restaurantName: {
                        $regex: search,
                        $options: "i"
                    }
                }).select("_id");

            filter.restaurants = {
                $in: FindRestaurants.map(restaurant => restaurant._id)
            };
        }

        const sortOption = {
            [sort]: order === "asc" ? 1 : -1
        }

        const totalProveder = await Provider.countDocuments(filter);

        const AllProviders = await Provider
            .find(filter)
            .populate("ownerName", "name email")
            .populate("restaurants")
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        if (AllProviders.length === 0) {
            return res.status(404).json({
                success: true,
                message: "provider data not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "restaurants data fetched",
            totalProveder: totalProveder,
            totalPage: Math.ceil(totalProveder / limit),
            currentPage: page,
            AllProviders
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const updateProvider = async (req, res, next) => {
    try {

        const id = req.params.id;

        const provider = await Provider.findById(id);

        if (!provider) {
            return next(new HttpError("provider data not found", 404));
        }

        const owner = await User.findById(provider.ownerName);

        if (!owner) {
            return next(new HttpError("ownername not found", 404));
        }

        if (owner.role !== "admin") {
            return next(new HttpError("owner role not matched", 404));
        }

        if (req.body.ownerName) {

            const newOwner = await User.findById(req.body.ownerName);

            if (!newOwner) {
                return next(new HttpError("new owner data not fount ", 404));
            }

            if (newOwner.role !== "admin") {
                return next(new HttpError("new owner role not matched", 404));
            }
        }

        if (req.query.restaurantId) {

            const restaurant = await restaurantModel.findById(req.query.restaurantId);

            if (!restaurant) {
                return next(new HttpError("restaurant data not found", 404));
            }

            const isRestaurantOwned = provider.restaurants.some( // data basr ma provider pase ketla restaurant temathi aek che te mate 
                (restaurantId) => restaurantId.toString() === req.query.restaurantId.toString());

            if (!isRestaurantOwned) {
                return next(new HttpError("restaurant id not fetched", 404));
            }

            if (req.body.restaurantName !== undefined) {
                restaurant.restaurantName = req.body.restaurantName;
            }

            if (req.body.description !== undefined) {
                restaurant.description = req.body.description;
            }

            if (req.body.address !== undefined) {
                restaurant.address = req.body.address;
            }

            if (req.body.state !== undefined) {
                restaurant.state = req.body.state;
            }

            if (req.body.city !== undefined) {
                restaurant.city = req.body.city;
            }

            if (req.body.phone !== undefined) {
                restaurant.phone = req.body.phone;
            }

            if (req.body.openingTime !== undefined) {
                restaurant.openingTime = req.body.openingTime;
            }

            if (req.body.closingTime !== undefined) {
                restaurant.closingTime = req.body.closingTime;
            }

            if (req.body.isOpen !== undefined) {
                restaurant.isOpen = req.body.isOpen;
            }

            await restaurant.save();
        }

        const updateData = {};

        if (req.body.ownerName) {
            updateData.ownerName = req.body.ownerName;
        }

        if (req.body.bankAccountNumber) {
            updateData.bankAccountNumber = req.body.bankAccountNumber;
        }


        if (req.files && req.files.length !== 0) {
            if (provider.cloudinary_id && provider.cloudinary_id.length !== 0) {
                for (const cloudinaryId of provider.cloudinary_id) {
                    await cloudinary.uploader.destroy(cloudinaryId, {
                        resource_type: "raw"
                    });
                }
            }

            updateData.documents = req.files.map((field) => field.path);
            updateData.cloudinary_id = req.files.map((field) => field.filename);
        }


        const updateProvider = await Provider.findByIdAndUpdate(id,
            {
                $set: updateData
            },
            {
                new: true,
                runValidators: true
            }
        )
        .populate("ownerName", "name email role")
        .populate("restaurants");

        res.status(200).json({
            success: true,
            message: "Provider updated successfully",
            data: updateProvider
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const DeleteProvider = async (req, res, next) => {
    try {

        const id = req.params.id;

        const provider = await Provider.findById(id);

        if (!provider) {
            return next(new HttpError("Providers data not found", 404));
        }

        const owner = await User.findById(provider.ownerName); // provider as owner define by id

        if (!owner || owner.role !== "admin") {
            return next(new HttpError("only provider owner with user admin can delete data", 404));
        }

        if (provider.cloudinary_id && provider.cloudinary_id.length !== 0) {
            for (const cloudinaryId of provider.cloudinary_id) {
                await cloudinary.uploader.destroy(cloudinaryId, {
                    resource_type: "raw"
                });
            }
        }

        await provider.deleteOne();

        await sendMail({
            to: req.user.email,
            name: req.user.name,
            email: req.user.email,
            // itemName: ,
            action: "PROVIDER_DELETED"
        });

        res.status(200).json({
            success: true,
            message: " Provider delete successFully ",
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

export default { registerAsProvider, getAllProvider, updateProvider, DeleteProvider };