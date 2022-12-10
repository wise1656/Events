import { DataBase } from '../services/db';

// запись пользователя на мероприятие
export class SubscriptionRepo {
    static async AddSubscription(subscription): Promise<string> {
        const { db } = DataBase.getInstance();
        const { insertedId } = await db.collection('Subscriptions').insertOne(subscription);
        return insertedId.toString();
    }
}

