export class UserService {
    static instance: UserService;
    static getInstance = () => UserService.instance ?? (UserService.instance = new UserService());

    getUserInfo(): (UserInfo | null) {
        const userInfoData = localStorage.getItem("UserInfo");
        if (userInfoData == null) 
            return null;
        
        const userInfo = JSON.parse(userInfoData);
        if (!isUserInfo(userInfo)) {
            console.error("Wrong user info saved", userInfo);
            return null;
        }
        
        return userInfo;
    }

    saveUserInfo(userInfo: UserInfo) {
        localStorage.setItem("UserInfo", JSON.stringify(userInfo));
    }
}

export type UserInfo = {
    name: string
    lastName: string
    birthday: string
    city: string
    church?: string
    phone: string
}

export function isUserInfo(userInfo: any): userInfo is UserInfo {
    return typeof userInfo == 'object'
           && typeof userInfo.name == 'string' 
           && typeof userInfo.lastName == 'string' 
           && typeof userInfo.birthday == 'string' 
           && typeof userInfo.city == 'string'
           && typeof userInfo.phone == 'string'
}

export function extractUserInfo(obj: UserInfo): [UserInfo, Record<string, any>] {
    const {name, lastName, birthday, city, church, phone, ...other} = obj;
    return [{name, lastName, birthday, city, church, phone}, other];
}

export const defaultUserInfo: UserInfo = {
    name: '',
    lastName: '',
    birthday: '',
    city: '',
    church: null,
    phone: ''
}