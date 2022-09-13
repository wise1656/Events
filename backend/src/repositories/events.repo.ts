import {ObjectId} from "bson";
import {DataBase} from "../services/db";
import {EventC} from "../../../frontend/src/shared/event"

export class EventsRepo {
    static async getEvents(): Promise<EventC[]> {
        const {db} = DataBase.getInstance();
        return await db.collection("Events")
            .find()
            .map(e => ({...e, _id: e._id.toString()} as EventC))
            .toArray()
    }

    static async saveEvent(event: EventC) {
        const dbEvent = ({...event, _id: new ObjectId(event._id)});
        const {db} = DataBase.getInstance();
        await db.collection("Events").insertOne(dbEvent);
    }
}



