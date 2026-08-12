import HttpError from "../middleware/HttpError.js";
import Category from "../model/category.model.js";

const addCategory = async (req ,res ,next)=>{
    try{

        const {name,description} = req.body;

        if(!req.files || req.files.length === 0){
            return next(new HttpError("category image required",400));
        }

        const newCategory = await Category.create({
            name,
            description,
            CategoryImage: req.files.map((field)=> field.path),
            cloudinary_id: req.files.map((field)=> field.filename)
        });

        if(!newCategory){
            return next(new HttpError("new category data not found",404));
        }

        res.status(201).json({
            success: true,
            message: "new category add successFully",
            newCategory
        });

    }catch(error){
        return next(new HttpError(error.message,500));
    }
};

export default {addCategory};