import HttpError from "../middleware/HttpError.js";
import Category from "../model/category.model.js";
import cloudinary from "../config/cloudinary.js";

const addCategory = async (req, res, next) => {
    try {

        const { name, description } = req.body;

        if (!req.files || req.files.length === 0) {
            return next(new HttpError("category image required", 400));
        }

        const newCategory = await Category.create({
            name,
            description,
            CategoryImage: req.files.map((field) => field.path),
            cloudinary_id: req.files.map((field) => field.filename)
        });

        if (!newCategory) {
            return next(new HttpError("new category data not found", 404));
        }

        res.status(201).json({
            success: true,
            message: "new category add successFully",
            newCategory
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const getAllCategory = async (req, res, next) => {
    try {

        let {
            page = 1,
            limit = 10,
            name,
            description,
            search,
            sort = "createdAt",
            order = "desc"
        } = req.body;

        page = Number(page);

        limit = Number(limit);

        const filter = {};

        if (name) {
            filter.name = name;
        }

        if (description) {
            filter.description = description;
        }

        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            }
        }

        const sortOption = {
            [sort]: order === "ase" ? 1 : -1
        }

        const totalCategory = await Category.countDocuments(filter);

        const categories = await Category
            .find(filter)
            .select("name description -_id")
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(limit)
            .lean()

        if (!categories || categories.length === 0) {
            res.status(404).json({
                success: true,
                message: "category data not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "All category data fetched",
            categories,
            totalCategory: totalCategory,
            tlimitotalPage: Math.ceil(totalCategory / limit),
            currentPage: page,

        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const updateCategory = async (req, res, next) => {
    try {

        const id = req.params.id;

        const category = await Category.findById(id);

        if (!category) {
            return next(new HttpError("Category data not found", 404));
        }

        const updates = Object.keys(req.body);

        const allowedFields = ["name", "description"];

        const isValidUpdates = updates.every((field) => 
            allowedFields.includes(field));

        if (!isValidUpdates) {
            return next(new HttpError("Invalid update fields", 400));
        }

        updates.forEach((field) => {
            category[field] = req.body[field];
        });

        if (req.files && req.files.length !== 0) {
            if (category.cloudinary_id && category.cloudinary_id.length !== 0) {
                for (const cloudinaryId of category.cloudinary_id) {
                    await cloudinary.uploader.destroy(cloudinaryId,
                        {
                            resource_type: "raw"
                        }
                    );
                }
            }

            category.CategoryImage = req.files.map((file) => file.path);

            category.cloudinary_id = req.files.map((file) => file.filename);

        }

        await category.save();

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category
        });

    } catch (error) {

        return next(new HttpError(error.message, 500));
    }
};

const DeleteCategory = async (req, res, next) => {
    try {

        const id = req.params.id;

        const category = await Category.findById(id);

        if (!category) {
            return next(new HttpError("category data not found", 404));
        }

        const owner = await User.findById(category.ownerName); // category as owner define by id

        if (!owner || owner.role !== "admin") {
            return next(new HttpError("only provider owner with user admin can delete data", 404));
        }

        if (category.cloudinary_id && category.cloudinary_id.length !== 0) {
            for (const cloudinaryId of category.cloudinary_id) {
                await cloudinary.uploader.destroy(cloudinaryId, {
                    resource_type: "raw"
                });
            }
        }

        await category.deleteOne();

        // await sendMail({
        //     to: req.user.email,
        //     name: req.user.name,
        //     email: req.user.email,
        //     // itemName: ,
        //     action: "PROVIDER_DELETED"
        // });

        res.status(200).json({
            success: true,
            message: " category delete successFully ",
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

export default { addCategory, getAllCategory, updateCategory, DeleteCategory };