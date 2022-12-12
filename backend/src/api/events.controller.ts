import { EventsRepo } from '../repositories/events.repo';
import { Server } from '../services/server.service';
import { authorizedWith} from '../middlewares/authorized';
import { Express } from 'express';
import { Request, Response } from 'express-serve-static-core';
import { WebSocketService } from '../services/web-socket.service';
import { EventC } from '../../../frontend/src/shared/event';
import { WsKey } from '../../../frontend/src/shared/ws-protocol';
import { AccessLevel } from '../repositories/usersAuthRepo';

Server.getInstance().regControllers((server: Express) => {
    // получает список всех мероприятий
    server.get('/api/events', async (req: Request, res: Response) => {
        const events = await EventsRepo.getEvents();
        res.send(events);
    });

    server.post('/api/event', authorizedWith(AccessLevel.Moderator), async (req: Request, res: Response) => {
        const event: EventC = req.body;
        const id = await EventsRepo.saveEvent(event);
        WebSocketService.getInstance().sendToAll(WsKey.events);
        res.send({id});
    });
});
