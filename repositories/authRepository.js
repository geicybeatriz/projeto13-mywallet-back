import db from "../database.js";

async function getUserByEmail(email){
  const user = await db.collection("users").findOne({email});
  return user;
}

async function createSession(id, token){
  const newSession = await db.collection("sessions").insertOne({userId: id, token});
  return newSession;
}

async function insertUser(name, email, password){
  return await db.collection("users").insertOne({name, email, password});
}

const authRepository = {
  getUserByEmail,
  createSession,
  insertUser
}
export default authRepository;