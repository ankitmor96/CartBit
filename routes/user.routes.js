import express from "express";
import userController from "../controller/user.controller.js";
import validate from "../middleware/validate.js";
import  registerSchema,{ updateSchema } from "../validation/register.Schema.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import {UserUploads} from "../middleware/uploads.js";
import {authLimiter} from "../middleware/RateLimiter.js";


// create router variable 
const router = express.Router();


// using post method create new user
router.post("/add" , authLimiter ,validate(registerSchema),UserUploads.single("ProfilePic"), userController.add);

//  register user login 
router.post("/login",authLimiter, userController.login);

// user auth login
router.post("/authLogin" ,auth, userController.authLogin);

// user update
router.patch("/update" , auth , authLimiter , validate(updateSchema), userController.update);

// show all user
router.get("/getAll" , auth , checkRole("admin") , userController.getAll);

//user auth logout
router.post("/logOut" , auth  , userController.logOut);

// LogoutAll tokens 
router.post("/logOutAll" , auth  , userController.logOutAll);

// delete user
router.delete("/deleteUser", auth , userController.deleteUser);


//export routes
export default router;
