import {Server} from "../services/server";
import * as path from "path";

// контроллер возвращает страницу по любому адресу не начинающемуся с /api/
Server.getInstance().regControllers(server => {
    server.get(/^(?!\/api\/).*$/, async (req, res) => {
        const options = {
            root: path.join(__dirname, '../../../')
        };
        const fileName = '123.txt';
        res.sendFile(fileName, options);
    });
});