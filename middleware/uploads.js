import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import HttpError from "./HttpError.js";


// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: "CartBit",
//         allowed_formats: ["jpeg", "jpg", "png", "webp"],
//         transformation: [
//             {
//                 height: 600,
//                 width: 600,
//                 crop: "limit",
//             },
//             {
//                 fetch_format: "webp",
//             },
//             {
//                 quality: "auto",
//             },
//         ],

//     },

// });

// const uploads = multer({
//     storage,
//     limits: {
//         fileSize: 20 * 1024 * 1024,
//     },
// });

// export default uploads;


const createUploads = ({
    folder,
    transformation = [],
    resource_type = "auto",
    fileSize = 1024 * 1024 * 20,
    allowed_formats = [],
    MimeType = [],
}) => {
    const storage = new CloudinaryStorage({
        cloudinary,
        params: async (req, file) => {
            return {
                folder,
                transformation,
                resource_type,
                allowed_formats
            };
        },


    });

    return multer({
        storage,
        limits: {
            fileSize
        },
        fileFilter: (req, file, cb) => {
            if (MimeType.length && !MimeType.includes(file.mimetype)) {
                return cb(new Error(` invalid mimtype , allowed mimtype : ${MimeType.join(", ")}`), false,);
            } else {
                cb(null, true);
            }
        },

    });
};

export const UserUploads = createUploads({
    folder: "CartBit/ProfilePic",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    MimeType: [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/webp"
    ]
});

export const RestaurantUploads = createUploads({
    folder: "CartBit/restaurantImage",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    MimeType: [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/webp"
    ]
});

export const ProviderUploads = createUploads({
    folder: "CartBit/documents",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    MimeType: [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/webp"
    ]
});



