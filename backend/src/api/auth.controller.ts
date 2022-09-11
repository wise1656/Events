import {Server} from "../services/server";
import {MailSender} from "../services/mail-sender";
import {UsersAuthRepo} from "../repositories/usersAuthRepo";
import hash from "hash-it";

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
            const token = generateToken();
            user.token = token;
            await UsersAuthRepo.saveUser(user);
            res.cookie('token', token);
        } else {
            res.statusCode = 401;
        }
        res.send();
    });
});

function generateCode() {
    return (Math.floor(Math.random() * 9000) + 1000).toString();
}

function generateToken() {
    return hash(new Date().getTime() + Math.floor(Math.random() * 100000)).toString();
}