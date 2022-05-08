import { Router } from "express";
import { signIn, signUp} from "../controllers/authController.js";
import { signInValidate } from "../middlewares/signInValidate.js";
import { signUpValidate } from "../middlewares/signUpValidate.js";

const authController = Router();

authController.post("/sign-in", signInValidate, signIn);
authController.post("/sign-up", signUpValidate, signUp);

export default authController;