import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

let database = null;
const mongoClient = new MongoClient(process.env.MONGO_URI);
mongoClient.connect(() => {
    database = mongoClient.db("my-wallet");
})

app.post("/sign-up", async (req, res) => {
    const newUser = req.body;
    const passwordHash = bcrypt.hashSync(newUser.password, 10);
    // const {name, email, password, repeat_password} = newUser;

    const userList = await database.collection("users").find({}).toArray();
    try {
        if(userList.find(user => user.email === newUser.email)){
            return res.status(409).send("Este e-mail já está cadastrado!");
        }

        await database.collection("users").insertOne({
            name: newUser.name,
            email: newUser.email,
            password: passwordHash
        });
        res.sendStatus(201);
    } catch (e) {
        console.log(chalk.bold.redBright("Deu erro"));
        res.status(500).send("Deu ruim");
    }
})



app.listen(process.env.PORT, () => console.log(chalk.bold.green("Servidor em pé")));