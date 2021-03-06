import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";

//módulos 
import authController from "./routers/authRouter.js";
import homeController from "./routers/homeRouters.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(json());
app.use(authController);
app.use(homeController);

app.listen(process.env.PORT, () => console.log(chalk.bold.green("Servidor em pé")));