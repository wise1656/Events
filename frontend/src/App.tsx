import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { getEvents } from 'redux/events.actions';
import { useAppDispatch } from 'redux/hooks';
import { RequestService } from 'services/request.service';
import { WebSocketFrontService } from 'services/web-socket-front.service';
import { WsKey } from 'shared/ws-protocol';
import { MainMenu } from 'components/MainMenu/MainMenu';
import { RoutesData } from 'components/Routes/routes';
import { styled } from '@mui/material';

const AppContainer = styled('div')({
    maxWidth: 600,
    padding: '0 15px',
    margin: 'auto'
});

export default function App() {
    useEventsAutoUpdate();

    return (
        <BrowserRouter>
            <InitRequestService />
            <AppContainer>
                <Routes>
                    {RoutesData.map((r) => (
                        <Route path={r.url} element={<r.component />} />
                    ))}
                    <Route path='*' element={<h1>404. Not Found!</h1>} />
                </Routes>
            </AppContainer>
            <MainMenu />
        </BrowserRouter>
    );
}

function useEventsAutoUpdate() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const wsService = WebSocketFrontService.getInstance();
        wsService.subscribe(WsKey.events, () => dispatch(getEvents()));
    }, []);
}

function InitRequestService() {
    const navigate = useNavigate();
    useEffect(() => {
        RequestService.getInstance().setNavigate(navigate);
    }, [navigate]);
    return null;
}

function Header() {
    return <div></div>;
}
