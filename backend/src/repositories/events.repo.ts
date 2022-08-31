import {ObjectId} from "bson";
import {Event} from "../../../shared/event"
import {DataBase} from "../services/db";

export class EventsRepo {
    static async getEvents(): Promise<Event[]> {
        const {db} = DataBase.getInstance();
        return await db.collection("Events")
            .find()
            .map(e => ({...e, _id: e._id.toString()} as Event))
            .toArray()
    }

    static async saveEvent(event: Event) {
        const dbEvent = ({...event, _id: new ObjectId(event._id)});
        const {db} = DataBase.getInstance();
        await db.collection("Events").insertOne(dbEvent);
    }
}



