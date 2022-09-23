import express, { json } from "express";
import "express-async-errors";
import handleErrorsMiddleware from "./middlewares/validations/handleErrorMiddleware.js";

import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";

//módulos 
import authRouter from "./routers/authRouter.js";
import homeController from "./routers/homeRouters.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(json());
app.use(authRouter);
app.use(homeController);
app.use(handleErrorsMiddleware);

const port = process.env.PORT;

app.listen(port, () => console.log(chalk.bold.green(`Servidor em pé na porta ${port}`)));