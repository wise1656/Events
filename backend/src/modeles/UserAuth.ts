// TODO: сделать время жизни ключа и токена
export interface UserAuth {
    _id: string
    email: string
    authCode: string
    token: string
    accessLevel: AccessLevel
}

export enum AccessLevel {
    User = 0,
    Moderator = 1,
    SuperAdmin = 2
}