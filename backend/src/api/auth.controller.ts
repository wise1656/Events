import {Server} from "../services/server.service";
import {MailSender} from "../services/mail-sender";
import {AccessLevel, UsersAuthRepo} from "../repositories/usersAuthRepo";
import hash from "hash-it";
import {authorized, authorizedWith, takeUserId} from "../middlewares/authorized";

Server.getInstance().regControllers(server => {
    server.post('/api/code', async (req, res) => {
        const {email} = req.body;
        const user = await UsersAuthRepo.getUserByEmail(email);
        const code = generateCode();
        user.authCode = code;
        await UsersAuthRepo.saveUser(user);
        MailSender.getInstance().sendMail({to: email, text: `Ваш код: ${code}`, subject: 'Код авторизации'}).then();
        res.send();
    });

    server.post('/api/login', async (req, res) => {
        const {email, code} = req.body;
        const user = await UsersAuthRepo.getUserByEmail(email);
        if (code == user.authCode) {
            user.token ??= generateToken();
            await UsersAuthRepo.saveUser(user);
        } else {
            res.statusCode = 401;
        }
        res.send(user.token && {token: user.token});
    });

    // проверка уровня доступа пользователя
    server.get('/api/accesslevel', takeUserId, async (req, res) => {
        const userId = req["userId"];
        let accessLevel = AccessLevel.User;
        if (userId) {
            const user = await UsersAuthRepo.getUserById(userId);
            accessLevel = user.accessLevel;
        }
        res.send({accessLevel});
    });

    // делает пользователя админом или забирает эти права
    server.post('/api/grandaccess', authorizedWith(AccessLevel.SuperAdmin), async (req, res) => {
        const {email, isGrand} = req.body as {email: string, isGrand: boolean};
        const user = await UsersAuthRepo.getUserByEmail(email);
        if (user) {
            user.accessLevel = isGrand ? AccessLevel.Moderator : AccessLevel.User;
            await UsersAuthRepo.saveUser(user);
            res.statusCode = 200;
            res.send();
        } else {
            res.statusCode = 400;
            res.send();
        }
    })
});

function generateCode() {
    return (Math.floor(Math.random() * 9000) + 1000).toString();
}

function generateToken() {
    return hash(new Date().getTime() + Math.floor(Math.random() * 100000)).toString();
}