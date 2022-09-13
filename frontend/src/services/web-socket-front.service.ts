import config from "../config/config";
import {UpdateData, WsKey} from "../shared/ws-protocol";

export class WebSocketFrontService {
    private static instance: WebSocketFrontService;
    private wsConnection: WebSocket = null;
    private callbacks = new Map<string, Set<SubscribeCallback>>();

    static getInstance() {
        return WebSocketFrontService.instance ??= new WebSocketFrontService();
    }

    constructor() {
        this.connect();
    }

    subscribe(key: WsKey, callback: SubscribeCallback) {
        let set = this.callbacks.get(key);
        if (!set) {
            set = new Set<SubscribeCallback>();
        }
        set.add(callback);
        this.callbacks.set(key, set);
    }

    unsubscribe(key: WsKey, callback: SubscribeCallback) {
        this.callbacks.get(key).delete(callback);
    }

    private connect() {
        this.wsConnection = new WebSocket(getServerWsUrl());

        this.wsConnection.onmessage = event => {
            const data: UpdateData = JSON.parse(event.data);
            const set = this.callbacks.get(data.key);
            if (set)
                set.forEach((cb: SubscribeCallback) => cb(data.id));
        }

        this.wsConnection.onclose = event => {
            if (event.code != 3000) // Unauthorized
                setTimeout(() => this.connect(), 1000);
        };

        this.wsConnection.onerror = error => {
            console.error(error);
        };
    }
}

type SubscribeCallback = (id?: string) => void;

function getServerWsUrl() {
    return `${window.location.protocol == 'http:' ? 'ws:' : 'wss:'}//${window.location.hostname}:${config.serverPort}/ws`
}
