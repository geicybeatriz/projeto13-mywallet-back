import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import signUpController from "./routers/signUpRouter";
dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(signUpController);

app.listen(process.env.PORT, () => console.log(chalk.bold.green("Servidor em pé")));