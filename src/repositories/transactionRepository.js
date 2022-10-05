import db from "../database.js";
import { ObjectId } from "mongodb";

async function getTransactionByUser(userId){
  const transactions = await db.collection("register").find({userId}).toArray();
  return transactions;
}

async function addTransaction(data){
  const newTransaction = await db.collection("register").insertOne({...data})
  return newTransaction;
}

async function updateTransaction(id, amount, description){
  return await db.collection('register').updateOne({
    _id: new ObjectId(id)
  }, {
    $set: {amount, description}
  });
}

async function getTransactionById(id){
  const transaction = await db.collection("register").findOne({
    _id: new ObjectId(id)
  })
  return transaction;
}

async function deleteTransaction(id){
  return await db.collection("register").deleteOne({_id:new ObjectId(id)});
}

const transactionRepository = {
  getTransactionByUser,
  addTransaction,
  updateTransaction,
  getTransactionById,
  deleteTransaction
}

export default transactionRepository;