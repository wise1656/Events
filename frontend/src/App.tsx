import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactSwitch from 'react-switch';
import cn from 'classnames';
import { useAppDispatch } from 'redux/hooks';
import { getEvents } from 'redux/events.actions';
import Events from 'components/Events/Events';
import Empty from 'components/Empty/Empty';
import './App.scss';

const DARK_THEME = 'darkTheme';

function App() {
    const [isDarkTheme, setIsDarkTheme] = useState(Number(localStorage.getItem(DARK_THEME)));
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getEvents());
    }, []);

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
                <Routes>
                    <Route index element={<Events />} />
                    <Route path='empty' element={<Empty />} />
                    <Route path='*' element={'404. Not Found!'} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
