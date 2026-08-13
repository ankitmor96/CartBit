import express from "express";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import { CategoryUploads } from "../middleware/uploads.js";
import categoryController from "../controller/category.controller.js";
import validate from "../middleware/validate.js";
import CategorySchema from "../validation/Category.Schema.js";
import {categoryUpdateSchema} from "../validation/Category.Schema.js"
import { authLimiter } from "../middleware/RateLimiter.js";

const router = express.Router();

router.post("/addCategory" , auth , authLimiter , authLimiter , checkRole("admin") , CategoryUploads.array("CategoryImage",2) , validate(CategorySchema) , categoryController.addCategory);

router.get("/getAllCategory" , auth , checkRole("admin") , categoryController.getAllCategory);

router.patch("/updateCategory/:id" , auth, authLimiter , checkRole("admin") , CategoryUploads.array("CategoryImage", 2), validate(categoryUpdateSchema), categoryController.updateCategory);

router.delete("/DeleteCategory" , auth , checkRole("admin") , categoryController.DeleteCategory);

export default router;