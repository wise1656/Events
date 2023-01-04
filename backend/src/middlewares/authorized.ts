import {NextFunction, Request, Response} from "express-serve-static-core";
import {AccessLevel, UserAuth} from "../modeles/UserAuth";
import { UsersAuthRepo } from "../repositories/usersAuthRepo";

// проверяет авторизацию пользователя и добавляет его id в запрос для дальнейших обработчиков
export async function authorized(req: Request, res: Response, next: NextFunction) {
    await authorizedWith(AccessLevel.User)(req, res, next)
}

// проверяет авторизацию пользователя и его доступ
export const authorizedWith = (level: AccessLevel) => async (req: Request, res: Response, next: NextFunction) => {
    const user: UserAuth = await getCurrentUser(req);
    const userAccess = user?.accessLevel ?? AccessLevel.User;
    if (!user || userAccess < level) {
        res.statusCode = 401;
        res.send();
    }
    else {
        req["userId"] = user._id;
        next();
    }
}

export const takeUserId = async (req: Request, res: Response, next: NextFunction) => {
    const user: UserAuth = await getCurrentUser(req);
    if (user)
        req["userId"] = user._id;
    next();
}

async function getCurrentUser(req) {
    const token = req.headers["authorization"] as string;
    let user: UserAuth;
    if (token)
        user = await UsersAuthRepo.getUserByToken(token);
    return user;
}
