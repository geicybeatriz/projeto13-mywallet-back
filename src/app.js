import express, { json } from "express";
import "express-async-errors";
import handleErrorsMiddleware from "./middlewares/validations/handleErrorMiddleware.js";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import homeController from "./routers/homeRouters.js";

const app = express();
app.use(cors());
app.use(json());
app.use("/auth", authRouter);
app.use("/myaccount", homeController);
app.use(handleErrorsMiddleware);

export default app;
