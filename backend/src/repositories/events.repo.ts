import {DataBase} from "../services/db";
import {EventC} from "../../../frontend/src/shared/event"


export class EventsRepo {
    static async getEvents(): Promise<EventC[]> {
        const events = await DataBase.getInstance().events.nedbFind({});
        return events
    }

    static async getEvent(id: string): Promise<EventC> {
        const event = await DataBase.getInstance().events.nedbFindOne({_id: id});
        return event;
    }

    static async saveEvent(event: EventC): Promise<string> {
        if (!event._id) {
            delete event._id;
            const newEvent = await DataBase.getInstance().events.nedbInsert(event);
            return newEvent._id;
        }

        DataBase.getInstance().events.nedbUpdate({_id: event._id}, event);
        return event._id;
    }
}



