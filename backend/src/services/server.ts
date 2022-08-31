import express from "express";
import * as core from "express-serve-static-core";

export class Server {
    static instance: Server;
    app: core.Express;
    controllers = [];
    
    static getInstance() {
        return Server.instance ?? (Server.instance = new Server());
    }

    static init() {
        const port = 3000;
        const app = express();
        app.listen(port, () => {
            return console.log(`server is listening on ${port}`);
        });
        Server.instance.app = app;
    }
    
    regControllers(controller: (server: core.Express) => void) {
        this.controllers.push(controller);
    }

    runControllers() {
        this.controllers.forEach(c => c(this.app));
    }
}