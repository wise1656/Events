import "./api/events.controller";
import "./api/auth.controller";
import "./pages/page.controller";
import {DataBase} from "./services/db";
import {Server} from "./services/server";
import {WebSocketService} from "./services/web-socket.service";

async function run() {
    await DataBase.init()
        .then(() => console.log("db inited"))
        .catch(console.error)

    Server.init();
    WebSocketService.getInstance();
    Server.getInstance().listen();
    Server.getInstance().runControllers();
}
run().then();