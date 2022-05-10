import { Router } from "express";
import { deleteTransation, getTransations, logOut, postTransation, updateTransation } from "../controllers/homeController.js";

const homeController = Router();
homeController.get("/home", getTransations);
homeController.post("/home", postTransation);
homeController.put("/home", logOut);
homeController.put("/home/:id", updateTransation);
homeController.delete("/home/:id", deleteTransation);

export default homeController;