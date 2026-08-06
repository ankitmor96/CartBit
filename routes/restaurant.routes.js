import express from "express";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import restaurantController from "../controller/restaurant.controller.js";
import {RestaurantUploads} from "../middleware/uploads.js";
import validate from "../middleware/validate.js";
import restaurantSchema from "../validation/restaurant.schema.js";
import updateRestaurantSchema from "../validation/restaurant.schema.js";

const router = express.Router();

router.post("/add" , auth , checkRole("admin","provider"), RestaurantUploads.single("restaurantImage"),validate(restaurantSchema), restaurantController.add);

router.get("/getAll" , auth , checkRole("admin") , restaurantController.getAll);

router.get("/getMyRestaurant" , auth , restaurantController.getMyRestaurant);

router.patch("/updateRestaurant/:id" , auth ,RestaurantUploads.single("restaurantImage") , checkRole("admin") , validate(updateRestaurantSchema) , restaurantController.updateRestaurant );

router.delete("/deleteRestaurant/:id" , auth , checkRole("admin") , restaurantController.deleteRestaurant);

export default router;

