import { View } from "react-native";
import { useState } from "react";
import { Text } from "react-native";
import CalendarContainer from "../CalendarContainer";

export default function CalendarTestScreen({navigation}) {
    // This screen is for testing the CalendarContainer component.
    // It will display a calendar for the current month and year.
    const today = new Date();
    const [displayMonth, setDisplayMonth] = useState(today.getMonth());
    const [displayYear, setDisplayYear] = useState(today.getFullYear());
    
    return (
        <View style={{ flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 0.1}}/>
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff'}}>
                <Text>Calendar Test Screen</Text>
                <View style={{flex: 0.1}}/>
                <CalendarContainer 
                    month={displayMonth} 
                    year={displayYear} 
                    renderDay={(day, month, year) => (
                        <View style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 0 }}>
                            <Text>{day}</Text>
                            {/* Below is a demonstration of content that you can put inside of a cell.
                                This content can be based on the date the cell holds.
                            */}
                            <Text>{day%2==0? "% by 2": ""}</Text>
                            <Text>{day%3==0? "% by 3": ""}</Text>
                        </View>
                    )}
                /> 
                <View style={{flex: 0.1}}/>
            </View>
            <View style={{flex: 0.1}}/>
        </View>
    );
}