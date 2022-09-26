import db from "../database.js";

async function getUserByEmail(email){
  return await db.collection("users").findOne({email});
}

async function createSession(id, token){
  const newSession = await db.collection("sessions").insertOne({userId: id, token});
  return newSession;
}

async function insertUser(name, email, password){
  return await db.collection("users").insertOne({name, email, password});
}

async function getSessionByToken(token){
  return await db.collection("sessions").findOne({token:token});
}

async function getUserById(id){
  return await db.collection("users").findOne({_id:id});
}

const authRepository = {
  getUserByEmail,
  createSession,
  insertUser,
  getSessionByToken,
  getUserById
}
export default authRepository;