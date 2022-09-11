import {DataBase} from "../services/db";
import {ObjectId} from "bson";

export class UsersAuthRepo {

    static async getUserByEmail(email: string): Promise<UserAuth> {
        const {db} = DataBase.getInstance();
        const usersAuth = db.collection("UsersAuth");
        let user = await usersAuth.findOne({email});
        if (!user) {
            const {insertedId} = await usersAuth.insertOne({email});
            user = {_id: insertedId, email};
        }
        return {...user, _id: user._id.toString()} as UserAuth;
    }

    static async getUserByToken(token: string): Promise<UserAuth> {
        const {db} = DataBase.getInstance();
        const usersAuth = db.collection("UsersAuth");
        const user = await usersAuth.findOne({token});
        return user && {...user, _id: user._id.toString()} as UserAuth
    }

    static async saveUser(user: UserAuth) {
        const {db} = DataBase.getInstance();
        const dbUser = {...user, _id: new ObjectId(user._id)}
        await db.collection("UsersAuth").updateOne({_id: dbUser._id}, {$set: dbUser}, {upsert: true});
    }

}

// ToDo: сделать время жизни ключа и токена
export interface UserAuth {
    _id: string
    email: string
    authCode: string
    token: string
}