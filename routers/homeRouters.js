import { Router } from "express";
import { deleteTransation, getTransations, logOut, postTransation, updateTransation } from "../controllers/homeController.js";
import transitionSchema from "../middlewares/Schemas/transitionSchema.js";
import { tokenValidationMid } from "../middlewares/validations/authmiddleware.js";
import validateSchemas from "../middlewares/validations/schemaValidation.js";

const homeController = Router();
homeController.get("/home", tokenValidationMid, getTransations);
homeController.post("/home", tokenValidationMid, validateSchemas(transitionSchema), postTransation);
homeController.put("/home",tokenValidationMid, logOut);
homeController.put("/home/:id", updateTransation);
homeController.delete("/home/:id", deleteTransation);

export default homeController;