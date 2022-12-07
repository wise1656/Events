import { extractUserInfo, isUserInfo, UserService } from 'services/User.service';
import { useSubscribeMutation } from 'redux/ApiQuery';
import { useCallback } from 'react';
import { SubscriptionsService } from 'services/Subscriptions.service';
import { addSubscribedEvent } from 'redux/subscriptions.slice';
import { useAppDispatch } from 'redux/store';

// создает функцию подписки на мероприятие, которая отправляет запрос с данными юзера
export function useSubscribe(eventId: string) {
    const [callSubscribe] = useSubscribeMutation();
    const dispatch = useAppDispatch();

    const subscribe = useCallback(async (data) => {
        let subscription = data;
        if (isUserInfo(data)) {
            const userInfo = extractUserInfo(data);
            UserService.getInstance().saveUserInfo(userInfo);
        }
        else {
            const userInfo = UserService.getInstance().getUserInfo();
            subscription = { ...userInfo, ...subscription };
        }
        subscription["eventId"] = eventId;

        await callSubscribe(subscription).unwrap()

        SubscriptionsService.getInstance().subscribeTo(eventId);
        dispatch(addSubscribedEvent(eventId));
    }, [eventId]);

    return subscribe;
}
