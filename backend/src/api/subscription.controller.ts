import { EventsRepo } from "../repositories/events.repo";
import { SubscriptionRepo } from "../repositories/subscription.repo";
import { Server } from "../services/server.service";

type Subscription = object & {eventId: string};


// пользователь подписывается на участие в мероприятии
Server.getInstance().regControllers(server => {
    server.post('/api/subscribe', async (req, res) => {
        const subscription = req.body;
        
        if (checkErrors(subscription)) {
            res.statusCode = 400;
            res.send();
            return;
        }

        const id = await SubscriptionRepo.addSubscription(subscription);
        res.send(JSON.stringify(id));
    })

    server.get('/api/subscribers', async (req, res) => {
        const id: string = req.query.id as string;
        const subscribers = await SubscriptionRepo.getSubscriptions(id);
        res.send(subscribers);
    })
})


function checkErrors(subscription: Subscription): subscription is Subscription {
	let error: string = null;
    if (typeof subscription.eventId != 'string')
        error = "No eventId field";
    if (!checkIsFlat(subscription)) {
        error = `Wrong subscription object added: ${JSON.stringify(subscription)}`;
    }
    if (error) {
        console.error(error);
    }
    return !!error;
}

// проверка что это плоский объект (все поля простые типы)
function checkIsFlat(obj: object): boolean {
    return typeof obj == 'object' && !Object.values(obj).some(o => o instanceof Object);
}
