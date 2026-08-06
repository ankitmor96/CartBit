import express from "express";
import validate from "../middleware/validate.js";
import providerSchema from "../validation/provider.Schema.js";
import providerController from "../controller/provider.controller.js";
import auth from "../middleware/auth.js";
import {ProviderUploads} from "../middleware/uploads.js";

const router = express.Router();

router.post("/registerAsProvider" ,auth , ProviderUploads.array("documents",2) , 
 validate(providerSchema) , providerController.registerAsProvider );

export default router;