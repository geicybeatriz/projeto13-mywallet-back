import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let database = null;
try {
    const mongoClient = new MongoClient(process.env.MONGO_URI);
    mongoClient.connect(() => {
        database = mongoClient.db("my-wallet");
    })
} catch (e) {
    console.log("Erro ao se conectar ao banco de dados!", e);    
}

export default database;