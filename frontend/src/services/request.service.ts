import config from "../config/config";

export class RequestService {
    private static instance: RequestService;
    static getInstance() {
        return RequestService.instance ??= new RequestService();
    }

    async get<T>(url: string): Promise<T> {
        const response = await fetch(RequestService.getServerUrl(url), {
            method: "GET",
            credentials: "include"
        });
        return this.processResponse(response);
    }

    async post<T = void>(url: string, data: Object): Promise<T> {
        const response = await fetch(RequestService.getServerUrl(url), {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return this.processResponse(response);
    }

    private async processResponse(response: Response) {
        if (response.status == 401) { // unauthorized
            return null;
        }

        const respTxt = await response.text();
        return respTxt ? JSON.parse(respTxt) : null;
    }

    static getServerUrl(url: string) {
        if (config.serverPort)
            return `${window.location.protocol}//${window.location.hostname}:${config.serverPort}${url}`
        return url;
    }
}