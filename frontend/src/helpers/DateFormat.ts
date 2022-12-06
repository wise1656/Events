
export const LongDateFormat = (date: Date | string) => Format(date, {day: 'numeric', month: 'long', year: 'numeric'});
export const TimeFormat = (date: Date | string) => Format(date, {hour: "numeric", minute: "2-digit"});
export const WeekdayFormat = (date: Date | string) => Format(date, {weekday: "long"});

function Format(date: Date | string, options: Intl.DateTimeFormatOptions) {
    let theDate = date;
    if (typeof theDate == 'string')
        theDate = new Date(date); 
    return new Intl.DateTimeFormat('ru', options)
        .format(theDate)
}