import express from "express";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import { FoodImageUploads } from "../middleware/uploads.js";
import FoodController from "../controller/Food.controller.js";
import validate from "../middleware/validate.js";
import FoodSchema from "../validation/Food.Schema.js"

const router = express.Router();

router.post("/addFood" , auth , checkRole("admin","provider") , validate(FoodSchema) , FoodImageUploads.array("FoodImage",2) , FoodController.addFood);

export default router;