import { View } from "react-native";
import { useState } from "react";
import { Text } from "react-native";
import CalendarContainer from "../CalendarContainer";

/**
 * This is a test object that simply changes color to 1 of 3 values depending on which 
 */
function CalendarCell({state}: {state: number}) {
    let color: string;
    switch(state%3) {
        case 0: 
            color = "#fdd";
            break;
        case 1: 
            color = "#dfd";
            break;
        default: 
            color = "#ddf";
            break;
    }
    return (
        <View style = {{borderWidth: 3, backgroundColor: color}}><Text>{state}</Text></View>
    );    
}

export default function CalendarTestScreen({navigation}) {
    // This screen is for testing the CalendarContainer component.
    // It will display a calendar for the current month and year.
    const today = new Date();
    const [displayMonth, setDisplayMonth] = useState(today.getMonth());
    const [displayYear, setDisplayYear] = useState(today.getFullYear());
    
    // demo array of randomized values to use to determine cell states.
    const testData: [number, number][] = Array.from({ length: 31 }, () => [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)]);
    

    return (
        <View style={{ flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 0.1}}/>
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff'}}>
                <Text>Calendar Test Screen</Text>
                <View style={{flex: 0.5}}/>
                <CalendarContainer 
                    month={displayMonth} 
                    year={displayYear} 
                    renderDay={(day, month, year) => (
                        <View style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 0 }}>
                            <Text>{day}</Text>
                            {/* Below is a demonstration of content that you can put inside of a cell.
                                This content can be based on the date the cell holds.
                              * In this case we create a test object that can show one of 3 states, then create an array
                                containing data which we use to determine which state to use. Which data point is used is dependent
                              * on the fed in day variable.
                            */}
                            <CalendarCell state = {testData[day-1][0]}/>
                            <CalendarCell state = {testData[day-1][1]}/>
                        </View>
                    )}
                /> 
                <View style={{flex: 0.1}}/>
            </View>
            <View style={{flex: 0.1}}/>
        </View>
    );
}