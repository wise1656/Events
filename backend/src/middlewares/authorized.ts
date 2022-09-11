import {NextFunction, Request, Response} from "express-serve-static-core";
import {UserAuth, UsersAuthRepo} from "../repositories/usersAuthRepo";

// проверяет авторизацию плользователя и добавляет его id в запрос для дальнейших обработчиков
export default async function (req: Request, res: Response, next: NextFunction) {
    const token = req.cookies["token"];
    let user: UserAuth;
    if (token)
        user = await UsersAuthRepo.getUserByToken(token);
    if (!user) {
        res.statusCode = 401;
        res.send();
    }
    else {
        req["userId"] = user._id;
        next();
    }
}
