// мероприятие
export interface EventC {
    _id: string;
    title: string;
    description: string;
    startDate: string;
    endDate?: string;
    schedule: ScheduleItem[];
    registrationInfo: RegistrationField[];
}

// расписание мероприятия
interface ScheduleItem {
    time: string; // например "2022-08-11T10:22"
    text: string;
}

// TODO: поменять формат всех комментариев на jsdoc
// описание полей заполняемых при регистрации
export interface RegistrationField {
    id: string;
    name: string;
    type: RegistrationFieldType;
    required?: boolean; // default true
    showWhen?: {
        // по умолчанию поле показывается
        id: string;
        value?: string | boolean; // если не выбрано показывается когда поле с id заполнено
    };
}

type RegistrationFieldType = "text" | "checkbox" | string[] /* это для select */;