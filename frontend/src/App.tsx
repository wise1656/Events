import {memo, useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactSwitch from 'react-switch';
import cn from 'classnames';
import Events from 'components/Events/Events';
import Empty from 'components/Empty/Empty';
import './App.scss';
import { useNavigate } from 'react-router-dom';
import {RequestService} from "./services/request.service";
import {Login} from "./components/Login/Login";

const DARK_THEME = 'darkTheme';

function App() {
    const [isDarkTheme, setIsDarkTheme] = useState(Number(localStorage.getItem(DARK_THEME)));
    return (
        <div className={cn('app', { 'app_dark-theme': isDarkTheme })}>
            <header>
                <div>Dark Mode</div>
                <ReactSwitch
                    checked={Boolean(isDarkTheme)}
                    onChange={() => {
                        if (isDarkTheme) {
                            localStorage.removeItem(DARK_THEME);
                        } else {
                            localStorage.setItem(DARK_THEME, '1');
                        }
                        setIsDarkTheme(isDarkTheme ? 0 : 1);
                    }}
                />
            </header>
            <BrowserRouter>
                <InitRequestService/>
                <Routes>
                    <Route index element={<Events />} />
                    <Route path='login' element={<Login/>} />
                    <Route path='empty' element={<Empty />} />
                    <Route path='*' element={'404. Not Found!'} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

const InitRequestService = memo(() => {
    const navigate = useNavigate();
    RequestService.getInstance().setNavigate(navigate);
    return null;
});

export default App;
