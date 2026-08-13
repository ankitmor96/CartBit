import express from "express";
import validate from "../middleware/validate.js";
import providerSchema from "../validation/provider.Schema.js";
import { privoderUpdateSchema } from "../validation/provider.Schema.js"
import providerController from "../controller/provider.controller.js";
import auth from "../middleware/auth.js";
import { ProviderUploads } from "../middleware/uploads.js";
import checkRole from "../middleware/checkRole.js";
import { authLimiter } from "../middleware/RateLimiter.js";

const router = express.Router();

router.post("/registerAsProvider", auth, authLimiter , ProviderUploads.array("documents", 2),
   checkRole("admin") , validate(providerSchema), providerController.registerAsProvider);

router.get("/getAllProvider" , auth  , checkRole("admin") , providerController.getAllProvider);

router.patch("/updateProvider/:id", auth, ProviderUploads.array("documents", 2),
 checkRole("admin"), providerController.updateProvider);

router.delete("/DeleteProvider/:id", auth, authLimiter , checkRole("admin"), providerController.DeleteProvider);

export default router;