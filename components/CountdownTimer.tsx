import React, { ReactNode, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
/**
 * @param countdownTarget {DateType} - The date to count down to.
 * @param countdownReference {DateType} - An optional field. If filled, this param is used for the current Date. If unfilled, new Date() is used.
 * @param showTarget {boolean} - Optional param which defaults to false if not set. If true, displays the Date we are counting down towards in addition to the usual display.
 */
interface CountdownTimerProps {
    countdownTarget: Date,
    countdownReference?: Date,
    showTarget?: boolean,
}

/**
 * A text display counting down the number of days to the specified target Date. If the target Date has already passed, displays "Date already passed".
 * @param countdownTarget {Date} - The date to count down to.
 * @param countdownReference {Date} - An optional field. If filled, this param is used for the current Date. If unfilled, new Date() is used.
 * @param showTarget {boolean} - Optional param which defaults to false if not set. If true, displays the Date we are counting down towards in addition to the usual display.
 */
export default function CountdownTimer({countdownTarget, countdownReference, showTarget}: CountdownTimerProps): ReactNode {
    // first, extract the Date object from the params so that we're working with ONLY JS Dates
    const targetDate = countdownTarget;
    const [referenceDate, setReferenceDate] = useState(countdownReference ?? new Date());
    // also handle the showTarget input -- if it's undefined assume false.
    showTarget = showTarget ?? false;

    useEffect(() => {
        // if the referenceDate is undefined (we are using current time as a reference), update to actual time every minute.
        const interval = setInterval(() => {if(countdownReference === null) setReferenceDate(new Date()), 1000 * 60}); // update every minute
        return () => clearInterval(interval);
    }, []);

    

    let timeRemaining = targetDate.getTime() - referenceDate.getTime();
    let daysRemaining = Math.floor(timeRemaining/(1000 * 60 * 60 * 24));
    return (
        <Text style={styles.countdownText}>
            {((daysRemaining > 0) ? daysRemaining + (daysRemaining > 1 ? " Days": " Day") + " to go!": "Date already passed.")
                + (showTarget ? " (target: " + targetDate.toDateString() + ")":""
            )}
        </Text>        
    );
}


const styles = StyleSheet.create({
    countdownText: {
        fontWeight: 'bold',
    }
});