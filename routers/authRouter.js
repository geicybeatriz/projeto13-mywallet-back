import { Router } from "express";
import { signIn, signUp} from "../controllers/authController.js";
import { signInValidate } from "../middlewares/validations/signInValidate.js";
import { signUpValidate } from "../middlewares/validations/signUpValidate.js";

const authController = Router();

authController.post("/", signInValidate, signIn);
authController.post("/sign-up", signUpValidate, signUp);

export default authController;