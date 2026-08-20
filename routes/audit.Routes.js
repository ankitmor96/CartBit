import express from "express";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import auditController from "../controller/audit.controller.js";

const router = express.Router();

router.get("/getAll" , auth , checkRole("admin") , auditController.getAll);

export default router;
