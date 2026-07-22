import express from "express";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import restaurantController from "../controller/restaurant.controller.js";
import uploads from "../middleware/uploads.js";
import validate from "../middleware/validate.js";
import restaurantSchema from "../validation/restaurant.schema.js";

const router = express.Router();

router.post("/add" , 
    auth , 
    checkRole("admin","provider"), 
    uploads.single("restaurantImage"),
    validate(restaurantSchema), restaurantController.add);

export default router;

