/**
 * Returns a string in the form [hours]:[minutes][am/pm (if 12hr format specified)]
 * @param date {Date}: The date to represent
 * @param use12HourFormat {boolean}: If true, represents in 12 hour format. uses 24hr format if false.
 */
export function convertToSimpleTime(date: Date, use12HourFormat: boolean): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const minuteString = minutes < 10 ? "0" + minutes: minutes.toString();

    if(!use12HourFormat) return hours + ":" + minutes;
    else {
        const isPm = hours >= 12;
        // funky thing here -- (hours % 12 || 12) returns 12 if hours % 12 == 0. 
        const formattedHours = hours % 12 || 12;
        return formattedHours + ":" + minuteString + (isPm ? "pm" : "am");
    }
}