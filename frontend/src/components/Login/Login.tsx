import {useState} from "react";
import {RequestService} from "../../services/request.service";
import {useNavigate} from "react-router-dom";

export function Login() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const navigate = useNavigate();

    const sendCode = async () => {
        await RequestService.getInstance().post(`/api/code`, {email});
        setCodeSent(true);
    }
    const login = async () => {
        await RequestService.getInstance().post("/api/login", {email, code});
        navigate("/");
    }

    return <div>
            <div>
                Email
                <input value={email} onChange={e => setEmail(e.target.value)}/>
                <button onClick={sendCode}>Отправить</button>
            </div>
            <div>
                Введите код с вашей почты:
                <input value={code} onChange={e => setCode(e.target.value)}/>
                <button onClick={login}>Отправить</button>
            </div>
    </div>
}