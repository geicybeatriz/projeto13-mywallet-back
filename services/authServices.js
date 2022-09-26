import authRepository from "../repositories/authRepository.js";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv";
dotenv.config();

async function verifyUser(email){
  const user = await authRepository.getUserByEmail(email);
  return user;
}

async function encryptPassword(password){
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
}

async function matchEncryptedPassword(encriptedPassword, password){
  const checkPassword = await bcrypt.compare(password, encriptedPassword);
  console.log(checkPassword);
  if(!checkPassword) throw {type:"unauthorized", message:"email e/ou senha incorretos"};
}

async function signInService(data){
  const userExist = await verifyUser(data.email);
  if(!userExist) throw {type: "not found", message:"usuário não registrado"};
  await matchEncryptedPassword(userExist.password, data.password);
  const token = uuidv4();
  await authRepository.createSession(userExist._id, token);
  return token;
}

async function signUpService(data){
  const userExist = await verifyUser(data.email);
  if(userExist) throw {type: "conflict", message:"usuário já existe"};

  const passwordHash = await encryptPassword(data.password);
  await authRepository.insertUser(data.name, data.email, passwordHash);
}

async function logOut(userId){
  return await authRepository.deleteSessionByUserId(userId);
}

const authServices = {
  signUpService,
  signInService,
  logOut
}

export default authServices;