//import {tokenValidate} from "./../middlewares/validations/tokenValidate.js";
//import {tokenValidationMid} from "./../middlewares/validations/authmiddleware.js";
//import {transitionValidation} from "../middlewares/validations/transitionDataValidate.js";
import { Router } from "express";
import { deleteTransation, getTransations, logOut, postTransation, updateTransation } from "../controllers/homeController.js";

const homeController = Router();
//homeController.use(tokenValidationMid);
homeController.get("/home", getTransations);
homeController.post("/home", postTransation);
homeController.put("/home", logOut);
homeController.put("/home/:id", updateTransation);
homeController.delete("/home/:id", deleteTransation);

export default homeController;