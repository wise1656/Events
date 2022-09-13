import WebSocket from "ws";
import {UsersAuthRepo} from "../repositories/usersAuthRepo";
import {Server} from "./server";
import expressWs from "express-ws";
import {UpdateData, WsKey} from "../../../frontend/src/shared/ws-protocol";

export class WebSocketService {
    static instance: WebSocketService;
    private connections = new Map<string, WebSocket.WebSocket[]>();

    static getInstance() {
        return WebSocketService.instance ?? (WebSocketService.instance = new WebSocketService());
    }

    constructor() {
        const app = Server.getInstance().app;
        const appWithWs = expressWs(app).app;

        appWithWs.ws('/ws', async (ws, req) => {
            const cookies = req.cookies;
            const userAuth = cookies && cookies['token'] && await UsersAuthRepo.getUserByToken(cookies['token']);
            if (!userAuth) {
                ws.close(3000); // Unauthorized
                return;
            }

            const {_id: userId} = userAuth;
            if (!this.connections.has(userId))
                this.connections.set(userId, []);
            this.connections.set(userId, [...this.connections.get(userId), ws]);

            ws.on('close', () => {
                this.connections.set(userId, [...this.connections.get(userId).filter(w => w !== ws)]);
            });

            ws.on("error", e => console.log(e));
        });
    }

    sendTo(userId: string, key: WsKey, id?: string) {
        try {
            this.connections.get(userId).forEach(ws =>
                ws.send(JSON.stringify({key, id} as UpdateData))
            );
        }
        catch (e) {
            console.error(e);
        }
    }

    sendToAll(key: WsKey, id?: string) {
        try {
            this.connections.forEach(userConnects =>
                userConnects.forEach(ws =>
                    ws.send(JSON.stringify({key, id} as UpdateData))
                ));
        }
        catch (e) {
            console.error(e);
        }
    }
}
