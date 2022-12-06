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

    static async getEvent(id: string): Promise<EventC> {
        const {db} = DataBase.getInstance();
        const event = await db.collection("Events").findOne({_id: new ObjectId(id)});
        if (event)
            return {...event, _id: event._id.toString()} as EventC;
        return null;
    }

    static async saveEvent(event: EventC) {
        const dbEvent = ({...event, _id: new ObjectId(event._id)});
        const {db} = DataBase.getInstance();
        await db.collection("Events").insertOne(dbEvent);
    }
}



