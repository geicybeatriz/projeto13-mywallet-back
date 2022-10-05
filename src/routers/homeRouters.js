import { Router } from "express";
import { deleteTransation, getTransations, logOut, postTransation, updateTransation } from "../controllers/homeController.js";
import transitionSchema from "../middlewares/Schemas/transitionSchema.js";
import { tokenValidationMid } from "../middlewares/validations/authmiddleware.js";
import validateSchemas from "../middlewares/validations/schemaValidation.js";

const homeController = Router();

homeController
  .all("/*", tokenValidationMid)
  .get("/home", getTransations)
  .post("/home", validateSchemas(transitionSchema), postTransation)
  .put("/home", logOut)
  .put("/home/:id", validateSchemas(transitionSchema), updateTransation)
  .delete("/home/:id", deleteTransation);

export default homeController;