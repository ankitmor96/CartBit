import express from "express";
import checkRole from "../middleware/checkRole.js";
import userController from "../controller/user.controller.js";
import auth from "../middleware/auth.js";
import uploads from "../middleware/uploads.js";
import validate from "../middleware/validate.js";
import { updateSchema } from "../validation/register.Schema.js";

const router = express.Router();

// update by admin
router.patch("/update/:id", auth , checkRole("admin") ,validate(updateSchema),userController.update);


// delete by admin
router.delete("/deleteUser/:id", auth, checkRole("admin"), userController.deleteUser);

export default router;