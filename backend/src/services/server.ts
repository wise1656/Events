import express from "express";
import * as core from "express-serve-static-core";
import config from '../../config';
import cors from "cors";
import cookieParser from "cookie-parser";

export class Server {
    static instance: Server;
    app: core.Express;
    controllers = [];

    static getInstance() {
        return Server.instance ?? (Server.instance = new Server());
    }

    static init() {
        const port = config.port;
        const app = express();
        app.listen(port, () => {
            return console.log(`server is listening on ${port}`);
        });
        app.use(express.static('../frontend/build'));
        app.use(express.json());
        app.use(cookieParser());
        app.use(cors({origin: "http://localhost:3000", credentials: true}));

        Server.instance.app = app;
        app.get("/", )
    }

    regControllers(controller: (server: core.Express) => void) {
        this.controllers.push(controller);
    }

    runControllers() {
        this.controllers.forEach(c => c(this.app));
    }
}