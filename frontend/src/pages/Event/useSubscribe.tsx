import { extractUserInfo, isUserInfo, UserService } from 'services/User.service';
import { useSubscribeMutation } from 'redux/ApiQuery';
import { useCallback } from 'react';

// создает функцию подписки на мероприятие, которая отправляет запрос с данными юзера
export function useSubscribe(eventId: string) {
    const [callSubscribe] = useSubscribeMutation();

    const subscribe = useCallback((data) => {
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

        return callSubscribe(subscription).unwrap()
    }, [eventId]);

    return subscribe;
}
