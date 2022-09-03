// мероприятие
export interface EventC {
  _id: string;
  title: string;
  description: string;
  image: string;
  placeCoordinates: string;
  startDate: string;
  schedule: ScheduleItem[];
  registrationInfo: RegistrationInfo;
  isPublic: boolean;
}

// расписание мероприятия
interface ScheduleItem {
  time: string; // например '2022-08-11T10:22'
  text: string;
}

// информация которую нужно будет предоставить при регистрации
// true в каждом поле означает что это поле появится при регистрации
interface RegistrationInfo {
  needTransport: boolean;
  canGiveTransport: boolean;
  needHousing: boolean;
}
