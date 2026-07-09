import express from "express";
import userController from "../controller/user.controller.js";
import validate from "../middleware/validate.js";
import registerSchema from "../validation/register.Schema.js";
import auth from "../middleware/auth.js";


// create router variable 
const router = express.Router();


// using post method create new user
router.post("/add" ,validate(registerSchema), userController.add);

// show all user
router.get("/getAll" , userController.getAll);

//  register user login 
router.post("/login", userController.login);

// user auth login
router.post("/authLogin" ,auth, userController.authLogin);

// user update
router.patch("/update" , auth , userController.update);

//user auth logout
router.delete("/logOut" , auth , userController.logOut);


//export routes
export default router;
