import express from "express";
import checkRole from "../middleware/checkRole.js";
import userController from "../controller/user.controller.js";
import auth from "../middleware/auth.js";
import {UserUploads} from "../middleware/uploads.js";
import validate from "../middleware/validate.js";
import { updateSchema } from "../validation/register.Schema.js";
import adminController from "../controller/admin.controller.js"

const router = express.Router();

// getAll user fetched by admin
router.get("/AllUser" , auth , checkRole("admin") , adminController.getAll);

// update by admin
router.patch("/update/:id", auth , checkRole("admin") ,validate(updateSchema),userController.update);


// delete by admin
router.delete("/deleteUser/:id", auth, checkRole("admin"), userController.deleteUser);

export default router;