import database from "../database.js";
import bcrypt from "bcrypt";
import chalk from "chalk";

export async function signUp(req, res){
    const newUser = req.body;
    const passwordHash = bcrypt.hashSync(newUser.password, 10);
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
        console.log(chalk.bold.redBright("Deu erro"), e);
        res.status(500).send("Deu ruim");
    }
}