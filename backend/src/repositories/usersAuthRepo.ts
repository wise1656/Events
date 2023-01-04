import {DataBase} from "../services/db";
import { UserAuth } from "../modeles/UserAuth";

export class UsersAuthRepo {

    static async getUserByEmail(email: string): Promise<UserAuth> {
        let user = await DataBase.getInstance().usersAuth.nedbFindOne({email});
        if (!user) {
            user = await DataBase.getInstance().usersAuth.nedbInsert({email} as UserAuth);
        }
        return user;
    }

    static async getUserByToken(token: string): Promise<UserAuth> {
        let user = await DataBase.getInstance().usersAuth.nedbFindOne({token});
        return user;
    }

    static async getUserById(id: string): Promise<UserAuth> {
        const user = await DataBase.getInstance().usersAuth.nedbFindOne({_id: id});
        return user;
    }

    static async saveUser(user: UserAuth) {
        await DataBase.getInstance().usersAuth.nedbUpdate({_id: user._id}, user);
    }
}
