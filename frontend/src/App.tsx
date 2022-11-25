import { useEffect } from 'react';
import { BrowserRouter, matchRoutes, Route, Routes, useNavigate } from 'react-router-dom';
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
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getEvents());
    }, []);
    
    return (
        <BrowserRouter>
            <AppContainer>
                <Routes>
                    {RoutesData.map((r) => (
                        <Route key={r.url} path={r.url + '/*'} element={<r.component />} />
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
