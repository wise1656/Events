export class AuthService {
    private static instance: AuthService;
    static getInstance() {
        return AuthService.instance ??= new AuthService();
    }

    private token: string;
    private email: string;
    
    getToken() {
        return this.token;
    }

    getEmail() {
        return this.email;
    }

    // TODO: сделать реализацию с определением прав на сервере
    isAdmin() {
        return true;
    }

    setAuthData(token: string, email: string) {
        this.token = token;
        this.email = email;
        localStorage.setItem("auth", JSON.stringify({email, token}));
    }

    restoreToken() {
        const authData = JSON.parse(localStorage.getItem("auth"));
        if (authData instanceof Object) {
            this.token = authData.token;
            this.email = authData.email;
        }
    }

    // TODO: должно сообщать серверу что пользователь вылогинился, чтобы менять токен
    logout() {
        this.setAuthData(null, null);
    }
}