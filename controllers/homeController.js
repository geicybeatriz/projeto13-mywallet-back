import db from "./../database.js";
import { ObjectId } from "mongodb";
import transactionServices from "../services/transactionServices.js";
import authRepository from "../repositories/authRepository.js";

export async function getTransations(req, res){
    const userId = res.locals.user._id;
    const transactions = await transactionServices.getTransations(userId);
    res.status(200).send(transactions);
}

export async function postTransation(req, res){
    const userId = res.locals.user._id;
    await transactionServices.addTransactions({...req.body, userId})
    res.sendStatus(200);
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
    const userId = res.locals.user._id;
    await authRepository.deleteSessionByUserId(userId);
    res.status(200).send("você saiu da sessão");
}