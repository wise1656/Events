import { DataBase } from '../services/db';

// запись пользователя на мероприятие
export class SubscriptionRepo {
    static async addSubscription(subscription): Promise<string> {
        const inserted = await DataBase.getInstance().subscriptions.nedbInsert(subscription);
        return inserted._id;
    }

    static async getSubscriptions(id: string) {
        const subscriptions = await DataBase.getInstance().subscriptions.nedbFind({eventId: id});
        return subscriptions;
    }
}

