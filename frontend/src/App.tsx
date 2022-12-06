import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { WebSocketFrontService } from 'services/WebSocketFront.service';
import { WsKey } from 'shared/ws-protocol';
import { MainMenu } from 'components/MainMenu/MainMenu';
import { RoutesData } from 'components/Routes/routes';
import { styled } from '@mui/material';
import { mainApi } from 'redux/ApiQuery';
import { useAppDispatch } from 'redux/store';

const AppContainer = styled('div')({
    maxWidth: 600,
    padding: '0 15px',
    margin: 'auto'
});

export default function App() {
    useEventsAutoUpdate();
    useInitialLoadData();
    
    return (
        <BrowserRouter>
            <AppContainer>
                <Routes>
                    {RoutesData.map((r) => (
                        <Route key={r.url} path={r.url + '/*'} element={<r.component />} />
                    ))}
                    <Route path='/' element={<Navigate to='eventlist'/>}/>
                    <Route path='*' element={<h1>404. Not Found!</h1>} />
                </Routes>
            </AppContainer>
            <MainMenu />
        </BrowserRouter>
    );
}


let getEventsFetcher: ReturnType<ReturnType<typeof mainApi.endpoints.getEvents.initiate>>;

// TODO: сделать обновление данных через сокет внутри mainApi, как в документации
function useEventsAutoUpdate() {
    useEffect(() => {
        const wsService = WebSocketFrontService.getInstance();
        wsService.subscribe(WsKey.events, () => getEventsFetcher.refetch());
    }, []);
}

function useInitialLoadData() {
    const dispatch = useAppDispatch();
    getEventsFetcher = dispatch(mainApi.endpoints.getEvents.initiate());
}

