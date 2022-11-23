import Empty from "pages/Empty/Empty";
import Events from "pages/Events/Events";
import { memo, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { getEvents } from "redux/events.actions";
import { RequestService } from "services/request.service";
import { WebSocketFrontService } from "services/web-socket-front.service";
import { WsKey } from "shared/ws-protocol";

export function LoggedInApp() {
    useEffect(() => {
        const wsService = WebSocketFrontService.getInstance();
        wsService.subscribe(WsKey.events, () => dispatch(getEvents()));
    }, [])

    return <BrowserRouter>
        <InitRequestService />
        <Routes>
            <Route index element={<Events />} />
            <Route path='empty' element={<Empty />} />
            <Route path='*' element={'404. Not Found!'} />
        </Routes>
    </BrowserRouter>
}

const InitRequestService = memo(() => {
    const navigate = useNavigate();
    RequestService.getInstance().setNavigate(navigate);
    return null;
});

function dispatch(arg0: any): void {
    throw new Error("Function not implemented.");
}
