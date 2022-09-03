import {EventC} from "../../../shared/event";

export class EventsService {
    static async getEvents() {
        const response = await fetch('/api/events');
        return await response.json() as EventC[];
    }
}