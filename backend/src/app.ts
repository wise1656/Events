import "./api/events.controller";
import "./api/auth.controller";
import "./pages/page.controller";
import {DataBase} from "./services/db";
import {Server} from "./services/server";

async function run() {
    await DataBase.init()
        .then(() => console.log("db inited"))
        .catch(console.error)

    Server.init();
    Server.getInstance().runControllers();
}
run().then();