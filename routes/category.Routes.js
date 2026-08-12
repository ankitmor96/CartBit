import express from "express";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import { CategoryUploads } from "../middleware/uploads.js";
import categoryController from "../controller/category.controller.js";
import validate from "../middleware/validate.js";
import CategorySchema from "../validation/Category.Schema.js"

const router = express.Router();

router.post("/addCategory" , auth , checkRole("admin") , CategoryUploads.array("CategoryImage",2) , validate(CategorySchema) , categoryController.addCategory);

router.get("/getAllCategory" , auth , checkRole("admin") , categoryController.getAllCategory);

export default router;