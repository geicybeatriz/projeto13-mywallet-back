import db from "./../database.js";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

export async function signIn(req, res){
    const {email, password} = req.body;

    const user = await db.collection("users").findOne({email});
    
    try {
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = uuidv4();
            await db.collection("sessions").insertOne({userId: user._id, token});
            res.status(200).send(token);
        }  else {
            res.status(404).send("email ou senha estão incorretos");
        }
    } catch (e) {
        console.log("erro", e);
        res.status(500).send("não foi possível conectar!");
    }
}

export async function signUp(req, res){
    const newUser = req.body;
    const passwordHash = bcrypt.hashSync(newUser.password, 10);
    const usersList = await db.collection("users").find({}).toArray();
    try {
        if(usersList.length !== 0 && usersList.find(user => user.email === newUser.email)){
            return res.status(409).send("Este e-mail já está cadastrado!");
        }
        
        await db.collection("users").insertOne({
            name: newUser.name,
            email: newUser.email,
            passwordHash: passwordHash
        });
        res.sendStatus(201);

    } catch (e) {
        res.sendStatus(500);
    }
}