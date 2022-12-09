import { ReplaceFieldType } from "helpers/TypeScriptHelpers";
import { RegistrationField, EventC } from "shared/event";

/** меняем поле type, добавляем поле list */
export type RegistrationFieldTypeEditing = ReplaceFieldType<
    RegistrationField,
    'type', 'text' | 'checkbox' | 'list'
> & { list?: string[] };

export type EventCEditing = ReplaceFieldType<
    EventC,
        'registrationInfo',
        RegistrationFieldTypeEditing[]
>;


export function convertToEditing(event: EventC): EventCEditing {
    if (!event) return null;
    return {...event, registrationInfo: event.registrationInfo?.map(field => {
        const type = isArray(field.type) ? 'list' : field.type;
        const list = isArray<string>(field.type) ? field.type : undefined;
        return {...field, type, list };
    })};
}

export function convertFromEditing(event: EventCEditing): EventC {
    if (!event) return null;
    return {...event, registrationInfo: event.registrationInfo?.map(field => {
        const type = field.type == 'list' ? normalize(field.list) : field.type;
        const {list, ...other} = field;
        return {...other, type};
    })};
}

function normalize(list: string[]) {
    return list.map(s => s.trim()).filter(s => s);
}

function isArray<T = any>(a): a is Array<T> {
    return a instanceof Array
}