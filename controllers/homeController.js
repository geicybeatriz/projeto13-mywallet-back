import transactionServices from "../services/transactionServices.js";
import authRepository from "../repositories/authRepository.js";
import authServices from "../services/authServices.js";

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
    const {amount, description} = req.body;
    const {id} = req.params;
    
    await transactionServices.updateTransaction(id, amount, description);
    res.sendStatus(200);
}

export async function deleteTransation(req, res){
    const {id} = req.params;
    await transactionServices.deleteTransaction(id);
    res.sendStatus(200);
}

export async function logOut(req, res){
    const userId = res.locals.user._id;
    await authServices.logOut(userId);
    res.status(200).send("você saiu da sessão");
}