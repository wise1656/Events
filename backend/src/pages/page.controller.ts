import {Server} from "../services/server.service";

// контроллер возвращает страницу по любому адресу не начинающемуся с /api/
Server.getInstance().regControllers(server => {
    server.get(/^(?!\/api\/).*$/, async (req, res) => {
        const options = {
            root: '../frontend/build'
        };
        const fileName = 'index.html';
        res.sendFile(fileName, options);
    });
});