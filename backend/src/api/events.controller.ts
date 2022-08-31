import {EventsRepo} from "../repositories/events.repo";
import {Server} from "../services/server";

Server.getInstance().regControllers(server => {
    
    // получает список всех мероприятий
    server.get('/api/events', async (req, res) => {
        const events = await EventsRepo.getEvents();
        res.send(events);
    });
    
});