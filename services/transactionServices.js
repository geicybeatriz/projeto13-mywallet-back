import dayjs from "dayjs";
import transactionRepository from "../repositories/transactionRepository.js";

async function getTransations(userId){
  const usertransactions = await transactionRepository.getTransactionByUser(userId);
  return usertransactions;
}

async function addTransactions(data){
  await transactionRepository.addTransaction({...data, createdAt: dayjs().format("DD/MM")})
  return;
}

async function verifyTransaction(id){
  const checkTransaction = await transactionRepository.getTransactionById(id);
  if(!checkTransaction) throw {type:"not found", message:"esta transação não existe"}
  return checkTransaction;
}

async function updateTransaction(id, amount, description){
  await verifyTransaction(id);
  await transactionRepository.updateTransaction(id, amount, description);
  return;
}

async function deleteTransaction(id){
  await verifyTransaction(id);
  await transactionRepository.deleteTransaction(id);
  return;
}

const transactionServices = {
  getTransations,
  addTransactions,
  updateTransaction,
  deleteTransaction
}

export default transactionServices;