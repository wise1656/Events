// сервис для сохранение на какие события пользователь был подписан
export class SubscriptionsService {
    static instance: SubscriptionsService;
    static getInstance = () => SubscriptionsService.instance ?? (SubscriptionsService.instance = new SubscriptionsService());

    subscribeTo(eventId: string) {
        if (!eventId) return;
        const list = [...this.getSubscriptions(), eventId];
        localStorage.setItem("subscriptions", JSON.stringify(list));
    }

    getSubscriptions(): string[] {
        const subscrStr = localStorage.getItem("subscriptions");
        return subscrStr ? JSON.parse(subscrStr) : [];
    }
}