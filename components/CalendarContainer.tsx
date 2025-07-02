import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Props for CalendarContainer.
 * @property renderDay - Function to render the content of each calendar cell, given day, 0-indexed month, year.
 * @property month - The month to display (0-indexed, e.g., January = 0). Defaults to current month.
 * @property year - The year to display. Defaults to current year.
 */
export interface CalendarContainerProps {
    renderDay: (day: number, month: number, year: number) => React.ReactNode;
    month?: number;
    year?: number;
}

/**
 * CalendarContainer is a flexible calendar grid component.
 * It renders a month view, with each cell rendered by the parent via a render function.
 * The component does not manage calendar entry data, but instead acts as a framework for rendering.
 *
 * @param props - CalendarContainerProps
 * @returns Calendar grid component
 */
const CalendarContainer: React.FC<CalendarContainerProps> = ({
    renderDay,
    month,
    year,
}) => {
    // Get current date if month/year not provided
    const today = new Date();
    const displayMonth = month ?? today.getMonth();
    const displayYear = year ?? today.getFullYear();

    // Names of the days of the week, starting with Sunday
    const weekDays = ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thurs.', 'Fri.', 'Sat.'];

    // First day of the month (0 = Sunday, 6 = Saturday)
    const firstDayOfMonth = new Date(displayYear, displayMonth, 1).getDay();

    // Number of days in the month
    const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();

    // Create array for calendar cells (including blanks at start)
    const calendarCells: (number | null)[] = [];

    // Fill leading blanks for the first week
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarCells.push(null);
    }

    // Fill days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        calendarCells.push(day);
    }

    // Fill trailing blanks to complete the last week
    while (calendarCells.length % 7 !== 0) {
        calendarCells.push(null);
    }

    // Split cells into weeks
    const weeks: (number | null)[][] = [];
    for (let i = 0; i < calendarCells.length; i += 7) {
        weeks.push(calendarCells.slice(i, i + 7));
    }

    return (
        <View style={styles.container}>
            <Text style={{textAlign: "center", fontWeight: 'bold'}}>{monthToString(displayMonth) + " " + displayYear}</Text>
            {/* Weekday headers */}
            <View style={[styles.row, {flex: 0}]}>
                {weekDays.map((day) => (
                    <Text key={day} style={styles.headerCell}>
                        {day}
                    </Text>
                ))}
            </View>
            {/* Calendar grid */}
            {weeks.map((week, idx) => (
                <View key={idx} style={styles.row}>
                    {week.map((day, i) => (
                        <View key={i} style={styles.cell}>
                            {day
                                ? renderDay(day, displayMonth, displayYear)
                                : null}
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
};

function monthToString(month: number, abbreviate: boolean = false) {
    const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let toReturn: string = months[month];
    if(abbreviate) {
        toReturn = toReturn.substring(0, 3) + ".";
    }
    return toReturn;
}

// Description of how things work with Flex...
// overall calendar is a container style, which contains the row styled elements.
// rows are full of cells.
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        padding: 1,
    },
    headerCell: {
        flex: 0.5,
        textAlign: 'center',
        justifyContent: 'center',
    },
    cell: {
        flex: 1,
        borderWidth: 2,
        borderRadius: 5,
        margin: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
});

export default CalendarContainer;