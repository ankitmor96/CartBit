import express from "express";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import { FoodImageUploads } from "../middleware/uploads.js";
import FoodController from "../controller/Food.controller.js";
import validate from "../middleware/validate.js";
import FoodSchema from "../validation/Food.Schema.js";
import {foodUpdateSchema} from "../validation/Food.Schema.js";
import { authLimiter } from "../middleware/RateLimiter.js";

const router = express.Router();

router.post("/addFood" , auth  , authLimiter , checkRole("admin","provider") , validate(FoodSchema) , FoodImageUploads.array("FoodImage",2) , FoodController.addFood);

router.get("/getAllFood" , auth , checkRole("admin") , FoodController.getAllFood);

router.patch("/updateFood/:id" , auth  , checkRole("admin") , validate(foodUpdateSchema) , FoodImageUploads.array("FoodImage", 2) , FoodController.updateFood);

router.delete("/DeleteFood/:id" , auth , checkRole("admin") , FoodController.DeleteFood);

export default router;