import db from "../database.js";

async function getTransactionByUser(userId){
  const transactions = await db.collection("register").find({userId}).toArray();
  return transactions;
}

async function addTransaction(data){
  const newTransaction = await db.collection("register").insertOne({...data})
  return newTransaction;
}

const transactionRepository = {
  getTransactionByUser,
  addTransaction
}

export default transactionRepository;