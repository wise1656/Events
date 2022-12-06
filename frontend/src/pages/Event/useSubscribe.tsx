import { extractUserInfo, isUserInfo, UserService } from 'services/User.service';
import { useSubscribeMutation } from 'redux/ApiQuery';

// создает функцию подписки на мероприятие, которая отправляет запрос с данными юзера
export function useSubscribe(showUserInfo: boolean, eventId: string) {
    const [callSubscribe] = useSubscribeMutation();

    const subscribe = (data) => {
        let subscription = data;
        if (showUserInfo) {
            if (!isUserInfo(data))
                console.error("Wrong UserInfo fields", data);
            const userInfo = extractUserInfo(data);
            UserService.getInstance().saveUserInfo(userInfo);
        }
        else {
            const userInfo = UserService.getInstance().getUserInfo();
            subscription = { ...userInfo, ...subscription };
        }
        subscription["eventId"] = eventId;

        return callSubscribe(subscription).unwrap()
    };

    return subscribe;
}
