import { useEffect, useState } from "react";
import { RequestService } from "services/request.service";
import { EventEmitter } from "eventemitter3";


const onLoginAction = new EventEmitter();

export const ChangeLoginStatus = (val: boolean) => {
    onLoginAction.emit("update", val);
};

export function CheckLoginHook() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    useEffect(() => {
        onLoginAction.addListener("update", (newVal) => {
            setIsLoggedIn(newVal);
        })
        RequestService.getInstance().post("/api/checklogin", {});
    }, [])
    return isLoggedIn;
}