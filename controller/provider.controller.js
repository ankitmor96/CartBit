import HttpError from "../middleware/HttpError.js";
import Provider from "../model/provider.model.js";
import User from "../model/user.model.js";


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
            bankAccountNumber
        });

        user.role = "provider";

        await newProvider.save();

        await user.save();

        res.status(201).json({
            success: true,
            message: "new Provider add successFully ",
            data: newProvider
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

export default { registerAsProvider };