import express from "express";
import validate from "../middleware/validate.js";
import providerSchema from "../validation/provider.Schema.js";
import providerController from "../controller/provider.controller.js";
import auth from "../middleware/auth.js";
import uploads from "../middleware/uploads.js";

const router = express.Router();

router.post("/add" ,auth , uploads.single("documents") ,  validate(providerSchema) , providerController.add );

export default router;