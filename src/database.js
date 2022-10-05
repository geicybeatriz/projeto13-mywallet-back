import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let db = null;
try {
    const mongoClient = new MongoClient(process.env.MONGO_URI);
    await mongoClient.connect();
    db = mongoClient.db(process.env.DB_NAME);
} catch (e) {
    console.log("Erro ao se conectar ao banco de dados!", e);    
}
export default db;