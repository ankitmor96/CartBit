import express from "express";
import userController from "../controller/user.controller.js";


// create router variable 
const router = express.Router();


// using post method create new user
router.post("/add" , userController.add);


//export routes
export default router;
