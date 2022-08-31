// мероприятие
export interface Event {
    _id: string
    title: string
    description: string
    image: string
    placeCoordinates: string
    startDate: string
    schedule: ScheduleItem[]
    registrationInfo: RegistrationInfo
    isPublic: boolean
}

// рассписание мероприятия
interface ScheduleItem {
    time: string
    text: string
}

// информация которую нужно будет предоставить при регистрации
// true в каждом поле означает что это поле появится при регистрации
interface RegistrationInfo {
    needTransport: boolean
    canGiveTransport: boolean
    needHousing: boolean
}