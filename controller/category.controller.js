import HttpError from "../middleware/HttpError.js";
import Category from "../model/category.model.js";

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

        if(name){
            filter.name = name ;
        }

        if(description){
            filter.description = description;
        }

        if(search){
            filter.name = {
                $regex : search,
                $options : "i"
            }
        }

        const sortOption = {
            [sort] : order === "ase" ? 1 : -1 
        }

        const totalCategory = await Category.countDocuments(filter);

        const categories = await Category
        .find(filter)
        .select("name description -_id")
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()

        if(!categories || categories.length === 0){
            res.status(404).json({
                success:true,
                message:"category data not found"
            });
        }

        res.status(200).json({
            success:true,
            message:"All category data fetched",
            categories,
            totalCategory: totalCategory,
            tlimitotalPage : Math.ceil(totalCategory/limit),
            currentPage : page,

        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

export default { addCategory, getAllCategory };