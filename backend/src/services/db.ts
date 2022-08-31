import {MongoClient, Db} from "mongodb";

export class DataBase {
    private static instance: DataBase;
    db: Db;
    
    static getInstance() {
        return DataBase.instance;
    }

    static async init() {
        const url = 'mongodb://localhost:27017';
        const client = new MongoClient(url);
        const dbName = 'Events';
        await client.connect();
        DataBase.instance = new DataBase();
        DataBase.instance.db = client.db(dbName);
    }
}