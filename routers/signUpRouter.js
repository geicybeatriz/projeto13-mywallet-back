import { Router } from "express";
import { signUp } from "../controllers/signUpController.js";

const signUpController = Router();
signUpController.post("/sign-up", signUp)

export default signUpController;
