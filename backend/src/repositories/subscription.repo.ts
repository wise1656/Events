import { DataBase } from '../services/db';

// запись пользователя на мероприятие
export class SubscriptionRepo {
    static async addSubscription(subscription): Promise<string> {
        const { db } = DataBase.getInstance();
        const { insertedId } = await db.collection('Subscriptions').insertOne(subscription);
        return insertedId.toString();
    }

    static async getSubscriptions(id: string) {
        const {db} = DataBase.getInstance();
        return await db.collection("Subscriptions")
            .find({eventId: id})
            .map(e => ({...e, _id: e._id.toString()}))
            .toArray()
    }
}

