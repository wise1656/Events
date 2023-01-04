import Nedb from "nedb";

export class NeDBAsync<T = any> {
    private db: Nedb<T>;

    constructor(pathOrOptions?: string | Nedb.DataStoreOptions) {
        this.db = new Nedb<T>(pathOrOptions);
    }

    nedbFind(query: any): Promise<T[]> {
        return new Promise((res, rej) =>
            this.db.find(query, {}, (err, docs) => {
                if (err) rej(err);
                res(docs);
            })
        );
    }
    
    nedbFindOne(query: any): Promise<T> {
        return new Promise((res, rej) =>
            this.db.findOne(query, {}, (err, doc) => {
                if (err) rej(err);
                res(doc);
            })
        );
    }
    
    nedbUpdate(query: any, updateQuery: any, options: Nedb.UpdateOptions = {}): Promise<T[]> {
        return new Promise((res, rej) =>
            this.db.update<T>(query, updateQuery, options, (err, _, docs) => {
                if (err) rej(err);
                res(docs);
            })
        );
    }
    
    nedbInsert(doc: T): Promise<T> {
        return new Promise((res, rej) =>
            this.db.insert<T>(doc, (err, docs) => {
                if (err) rej(err);
                res(docs);
            })
        );
    }
}

