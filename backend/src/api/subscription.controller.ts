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

        const namedSubscription = await convertFieldIdToNames(subscription);
        const id = await SubscriptionRepo.SaveSubscription(namedSubscription);
        res.send(JSON.stringify(id));
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

// заменяет называния полей с номеров на имена из описания мероприятия
// (приходит в формате {1: true, 2: "2"}, возвращаем в формате {"Нужен ночлег": true, "Количество ночей": 2})
async function convertFieldIdToNames(obj: Subscription): Promise<Subscription> {
    const event = await EventsRepo.getEvent(obj.eventId);
    if (!event) return obj;
    const fieldsMap = Object.fromEntries(event.registrationInfo.map(i => ([i.id, i.name])));
    const entries = Object.entries(obj);
    const updatedEntries = entries.map(([key, val]) => ([fieldsMap[key] || key, val]));
    return Object.fromEntries(updatedEntries);
}