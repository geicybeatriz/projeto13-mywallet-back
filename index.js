import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";

import signUpController from "./routers/signUpRouter.js";
import signInController from "./routers/signInRouter.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(json());
app.use(signUpController);
app.use(signInController);

app.listen(process.env.PORT, () => console.log(chalk.bold.green("Servidor em pé")));