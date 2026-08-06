import HttpError from "../middleware/HttpError.js";
import Provider from "../model/provider.model.js";


const add = async (req ,res ,next)=>{
    try{

        const {restaurants , bankAccountNumber} = req.body;

        if(!req.file){
            return next(new HttpError("req file not found",404));
        }
       
        const newProvider =  await Provider.create({
            ownerName: req.user._id,
            restaurants,
            documents:req.file?.path ,
            cloudinary_id:req.file?.filename ,
            bankAccountNumber 
        });

       res.status(201).json({
            success:true,
            message:"new Provider add successFully ",
            data:newProvider
        });

    }catch(error){
        return next(new HttpError(error.message,500));
    }
};

export default {add};