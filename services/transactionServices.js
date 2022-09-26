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


const transactionServices = {
  getTransations,
  addTransactions
}

export default transactionServices;