import {EventsRepo} from "../repositories/events.repo";
import {Server} from "../services/server";
import authorized from "../middlewares/authorized";
import {Express} from "express";

Server.getInstance().regControllers((server: Express) => {

    // получает список всех мероприятий
    server.get('/api/events', [authorized], async (req, res) => {
        const events = await EventsRepo.getEvents();
        res.send(events);
    });
});