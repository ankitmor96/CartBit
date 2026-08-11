import HttpError from "../middleware/HttpError.js";
import Provider from "../model/provider.model.js";
import User from "../model/user.model.js";
import sendMail from "../utils/SendMail.js";


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

const updateProvider = async (req, res, next) => {
    try {

        const id = req.params.id;

        const provider = await Provider.findById(id);

        if (!provider) {
            return next(
                new HttpError("Provider data not found", 404));
        }

        const owner = await User.findById(provider.ownerName);

        if (!owner || owner.role !== "admin") {
            return next(
                new HttpError(
                    "Only provider owner and owner must be admin", 404));
        }

        if (req.body.ownerName) {

            const newOwner = await User.findById(
                req.body.ownerName
            );

            if (!newOwner) {
                return next(
                    new HttpError("New owner not found", 404)
                );
            }

            if (newOwner.role !== "admin") {
                return next(
                    new HttpError(
                        "New owner must be admin",
                        403
                    )
                );
            }
        }



        if (req.files && req.files.length > 0) {

            for (const publicId of provider.cloudinary_id) {
                await cloudinary.uploader.destroy(publicId);
            }

            req.body.documents = req.files.map(
                (file) => file.path
            );

            req.body.cloudinary_id = req.files.map(
                (file) => file.filename
            );
        }


        // 5. Update ALL Provider fields using query
        const updatedProvider =
            await Provider.findByIdAndUpdate(
                id,
                {
                    $set: req.body
                },
                {
                    new: true,
                    runValidators: true
                }
            );

        res.status(200).json({
            success: true,
            message: "Provider updated successfully",
            data: updatedProvider
        });

    } catch (error) {
        return next(
            new HttpError(error.message, 500)
        );
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


        await provider.deleteOne();

        await sendMail({
            to: req.user.email,
            name: req.user.name,
            email: req.user.email,
            // itemName: ,
            action: "PROVIDER_DELETED"
        });

        res.status(201).json({
            success: true,
            message: " Provider delete successFully ",
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

export default { registerAsProvider, DeleteProvider };