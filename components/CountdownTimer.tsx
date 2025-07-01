import React, { ReactNode, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
/**
 * A type which can either be a [day, month, year] tuple, or a JS Date object.
 * When using this type, be sure to use toDate() on it to extract the JS Date object from it. 
 */
type DateType =
    | { day: number; month: number; year: number; date?: never}
    | { date: Date; day?: never; month?: never; year?: never};

/**
 * @param countdownTarget {DateType} - The date to count down to.
 * @param countdownReference {DateType} - An optional field. If filled, this param is used for the current Date. If unfilled, new Date() is used.
 * @param showTarget {boolean} - Optional param which defaults to false if not set. If true, displays the Date we are counting down towards in addition to the usual display.
 */
interface CountdownTimerProps {
    countdownTarget: DateType,
    countdownReference?: DateType,
    showTarget?: boolean,
}


/**
 * Extracts a JS Date object from the given DateType instance. When using DateType's, make sure to call this function on the type
 * to extract the object from it for consistency.
 */
function toDate(props: DateType): Date {
    // If the props has a JS date, then just return that
    if ('targetDate' in props && props.date instanceof Date) {
        return props.date;
    }
    // Month is 1-based, JS Date expects 0-based
    return new Date(props.year!, props.month! - 1, props.day!);
}

/**
 * A text display counting down the number of days to the specified target Date. If the target Date has already passed, displays "Date already passed".
 * @param countdownTarget {DateType} - The date to count down to.
 * @param countdownReference {DateType} - An optional field. If filled, this param is used for the current Date. If unfilled, new Date() is used.
 * @param showTarget {boolean} - Optional param which defaults to false if not set. If true, displays the Date we are counting down towards in addition to the usual display.
 */
export default function CountdownTimer({countdownTarget, countdownReference, showTarget}: CountdownTimerProps): ReactNode {
    // first, extract the Date object from the params so that we're working with ONLY JS Dates
    let targetDate = toDate(countdownTarget);
    const [referenceDate, setReferenceDate] = useState((countdownReference !== undefined) ? toDate(countdownReference): new Date());
    // also handle the showTarget input -- if it's undefined assume false.
    if(showTarget === undefined) showTarget = false;

    useEffect(() => {
        // if the referenceDate is undefined (we are using current time as a reference), update to actual time every minute.
        const interval = setInterval(() => {if(countdownReference !== undefined) setReferenceDate(new Date()), 1000 * 60}); // update every minute
        return () => clearInterval(interval);
    }, []);

    

    // Below is the code which gets the difference in #days between the two dates (target - reference)
    let daysRemaining = targetDate.getDate() - referenceDate.getDate(); // start with the difference in month dates.
    // now we need to add in all the days as a result of the months...
    for(let i = referenceDate.getMonth(); i < targetDate.getMonth(); i++) {
        // we use a little hack: a "day" parameter of 0 loops around to the largest possible date for that month,
        // so by making a new Date using some year, the month we want, and 0 for the day, getDate() will return the
        // number of days in that month. 
        daysRemaining += new Date(2000, i, 0).getDate();
    }
    // This helps to handle when the reference date is on a month after that of the target date (the target date has already passed).
    for(let i = targetDate.getMonth(); i < referenceDate.getMonth(); i++) {
        daysRemaining -= new Date(2000, i, 0).getDate();
    }       
    daysRemaining += 365*(targetDate.getFullYear() - targetDate.getFullYear()); // account for year diff

    return (
        <Text style={styles.countdownText} >
            {((daysRemaining > 0) ? daysRemaining + " Days to go!": "Date already passed.") + (showTarget ? " (target: " + targetDate.toDateString() + ")":"")}
        </Text>        
    );
}


const styles = StyleSheet.create({
    countdownText: {
        fontWeight: 'bold',
        
    }
});