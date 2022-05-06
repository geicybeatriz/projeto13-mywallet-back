import { Router } from "express";
import { signIn } from "../controllers/signInController.js";

const signInController = Router();
signInController.post("/sign-in", signIn)

export default signInController;