import { Router } from "express";
import { signIn, signUp} from "../controllers/authController.js";
import userSignInSchema from "../middlewares/Schemas/signInSchema.js";
import userSignUpSchema from "../middlewares/Schemas/signUpSchema.js";
import validateSchemas from "../middlewares/validations/schemaValidation.js";

const authRouter = Router();

authRouter
  .post("/sign-in", validateSchemas(userSignInSchema), signIn)
  .post("/sign-up", validateSchemas(userSignUpSchema), signUp);

export default authRouter;