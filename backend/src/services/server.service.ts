import express from "express";
import * as core from "express-serve-static-core";
import config from '../../config';
import cors from "cors";
import cookieParser from "cookie-parser";
import {Response} from "express-serve-static-core";

export class Server {
    private static instance: Server;
    app: core.Express;
    controllers = [];

    static getInstance() {
        return Server.instance ?? (Server.instance = new Server());
    }

    // TODO: сделать обработку ошибок, чтобы возвращался 500 ошибка
    static init() {
        const app = express();

        app.use(express.static('../frontend/build'));
        app.use(express.json());
        app.use(cookieParser());
        app.use(cors({origin: "http://localhost:3000", credentials: true}));

        Server.instance.app = app;

        process.on('uncaughtException', err => console.log(err));
    }

    listen() {
        const port = config.port;
        this.app.listen(port, () => {
            return console.log(`server is listening on ${port}`);
        });
    }

    regControllers(controller: (server: core.Express) => void) {
        this.controllers.push(controller);
    }

    runControllers() {
        this.controllers.forEach(c => c(this.app));
    }
}

export const setTokenCookie = (res: Response, token: string) => {
    res.cookie('token', token, {httpOnly: true, maxAge: 365*24*60*60 /* year */});
}