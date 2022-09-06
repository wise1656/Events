import {MongoClient, Db} from "mongodb";
import config from '../../config';

export class DataBase {
    private static instance: DataBase;
    db: Db;
    
    static getInstance() {
        return DataBase.instance;
    }

    static async init() {
        const url = config.db;
        const client = new MongoClient(url);
        const dbName = 'Events';
        await client.connect();
        DataBase.instance = new DataBase();
        DataBase.instance.db = client.db(dbName);
    }
}