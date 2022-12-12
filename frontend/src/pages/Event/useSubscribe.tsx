import { extractUserInfo, isUserInfo, UserService } from 'services/User.service';
import { selectEvent, useSubscribeMutation } from 'redux/ApiQuery';
import { useCallback } from 'react';
import { SubscriptionsService } from 'services/Subscriptions.service';
import { addSubscribedEvent } from 'redux/subscriptions.slice';
import { useAppDispatch } from 'redux/store';
import { useSelector, Subscription } from 'react-redux';
import { EventC } from 'shared/event';

// создает функцию подписки на мероприятие, которая отправляет запрос с данными юзера
export function useSubscribe(eventId: string) {
    const [callSubscribe] = useSubscribeMutation();
    const dispatch = useAppDispatch();
    const event = useSelector(selectEvent(eventId));

    const subscribe = useCallback(async (data) => {
        let subscription = data;
        if (isUserInfo(data)) {
            const [userInfo, other] = extractUserInfo(data);
            UserService.getInstance().saveUserInfo(userInfo);
            subscription = { ...userInfo, ...convertFieldIdToNames(event, other as Subscription) };
        }
        else {
            const userInfo = UserService.getInstance().getUserInfo();
            subscription = { ...userInfo, ...convertFieldIdToNames(event, subscription) };
        }
        subscription["eventId"] = eventId;

        await callSubscribe(subscription).unwrap()

        SubscriptionsService.getInstance().subscribeTo(eventId);
        dispatch(addSubscribedEvent(eventId));
    }, [eventId]);

    return subscribe;
}

// заменяет называния полей с номеров на имена из описания мероприятия
// (приходит в формате {1: true, 2: "2"}, возвращаем в формате {"Нужен ночлег": true, "Количество ночей": 2})
function convertFieldIdToNames(event: EventC, obj: Subscription) {
    const fieldsMap = Object.fromEntries(event.registrationInfo.map(i => ([i.id, i.name])));
    const entries = Object.entries(obj);
    const updatedEntries = entries.map(([key, val]) => ([fieldsMap[key] || key, val]));
    return Object.fromEntries(updatedEntries);
}