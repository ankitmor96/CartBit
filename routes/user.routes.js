import express from "express";
import userController from "../controller/user.controller.js";
import validate from "../middleware/validate.js";
import registerSchema from "../validation/register.Schema.js";


// create router variable 
const router = express.Router();


// using post method create new user
router.post("/add" ,validate(registerSchema), userController.add);

//  register user login 
router.post("/login", userController.login);


//export routes
export default router;
