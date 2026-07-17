import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "CartBit",
        allowed_formats: ["jpeg", "jpg", "png", "webp"],
        transformation: [
            {
                height: 600,
                width: 600,
                crop: "limit",
            },
            {
                fetch_format: "webp",
            },
            {
                quality: "auto",
            },
        ],

    },

});

const uploads = multer({
    storage,
    limits: {
        fileSize: 20 * 1024 * 1024,
    },
});

export default uploads;


