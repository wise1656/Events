import { EventC } from "../../../frontend/src/shared/event";
import config from '../../config';
import { UserAuth } from "../modeles/UserAuth";
import { NeDBAsync } from "../helpers/nedb-async";

export class DataBase {
    private static instance: DataBase;
    events = new NeDBAsync<EventC>({ filename: './dbs/events.db', autoload: true })
    subscriptions = new NeDBAsync({ filename: './dbs/subscriptions.db', autoload: true })
    usersAuth = new NeDBAsync<UserAuth>({ filename: './dbs/usersAuth.db', autoload: true })
    
    static getInstance() {
        return DataBase.instance;
    }

    static async init() {
        DataBase.instance = new DataBase();
    }
}
