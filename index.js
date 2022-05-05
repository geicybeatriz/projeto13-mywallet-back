import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();
app.use(cors());
app.use(json());

app.listen(5000, () => console.log(chalk.bold.green("Servidor em pé")));