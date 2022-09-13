export interface UpdateData {
    key: WsKey
    id?: string
}

export enum WsKey {
    events = "EVENTS"
}