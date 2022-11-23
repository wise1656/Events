import './App.scss';
import { CheckLoginHook as useCheckLogin } from 'pages/Login/login-hook';
import { LinearProgress } from '@mui/material';
import { LoggedInApp } from 'LoggedInApp';
import { Login } from 'pages/Login/Login';

function App() {
    const isLoggedIn = useCheckLogin();

    if (isLoggedIn == null)
        return <LinearProgress />;
    else if (!isLoggedIn)
        return <Login />;
    else
        return <LoggedInApp />;
}

export default App;