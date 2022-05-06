import database from "../database.js";
import bcrypt from "bcrypt";
import uuid from "uuid";

export async function signIn(req, res){
    const {email, password} = req.body;
    const user = await database.collection("users").find({email});
    
    try {
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = uuid.v4();
            await database.collection("user-wallet").insertOne({
                userId: user._id,
                token
            })
            res.status(200).send(token);
        }  else {
            res.status(404).send("email ou senha estão incorretos");
        }
    } catch (e) {
        console.log("erro", e);
        res.status(500).send("não foi possível conectar!");
    }
}