import db from "./../database.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import transitionSchema from "../middlewares/Schemas/transitionSchema.js";

export async function getTransations(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);

    try{
        const session = await db.collection("sessions").findOne({token});
        if(!session) return res.sendStatus(401);

        const user = await db.collection("users").findOne({_id: session.userId});
        if(!user) return res.sendStatus(401);

        const userRegisters = await db.collection("register").find({userAdress: user.email}).toArray();
        console.log(userRegisters);

        delete user.password;
        res.status(200).send([userRegisters, user]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function postTransation(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);

    const cashRegister = req.body;
    const validation = transitionSchema.validate(cashRegister, {abortEarly:false});
    if(validation.error) return res.sendStatus(422);

    try {
        const session = await db.collection("sessions").findOne({token});
        console.log("session", session)
        if(!session) return res.sendStatus(401);

        const user = await db.collection("users").findOne({_id: session.userId});
        console.log("user", user);

        if(!user) return res.sendStatus(401);
        
        const userRegister = await db.collection("register").insertOne({...cashRegister,
                userAdress: user.email,
                date: dayjs().format("DD/MM")
        });

        res.status(201).send(userRegister);
    } catch (e) {
        console.log("erro", e);
        res.sendStatus(500);
        
    }
}

export async function updateTransation(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);

    const {amount, description} = req.body;
    const {id} = req.params;
    try {
        await db.collection('register').updateOne({
            _id: new ObjectId(id)}, 
            {$set: {amount, description}
        });
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send("erro ao atualizar registro.")
    }
    
}

export async function deleteTransation(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);

    const {id} = req.params;
    try {
        await db.collection("register").deleteOne({_id:new ObjectId(id)});
        res.sendStatus(200);
    } catch (error) {
        console.log("erro", error);
        res.sendStatus(500);
    }

}

export async function logOut(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);

    const sessions = await db.collection("sessions").findOne({token});
    const user = await db.collection("users").findOne({_id: sessions.userId});

    await db.collection("sessions").updateOne({_id: new ObjectId(user._Id)}, {$set:{token:""}});
    res.status(200).send("vc saiu da sessão");
}