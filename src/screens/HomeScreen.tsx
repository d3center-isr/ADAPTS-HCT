/** 
 * Main landing screen of the app.
 */

import { StyleSheet } from "react-native"
import { Text, View, Image } from "react-native"
import CalendarContainer from "components/common/CalendarContainer";
import CountdownTimer from "components/CountdownTimer";

export default function HomeScreen() {
  
  const currentDate = new Date();

  return (
      <View style={{flexDirection:'column', flex: 1}}>
          <Text>This is a debug Home Screen</Text>
          <CountdownTimer showTarget={true} countdownTarget={
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
          }/>
          <CalendarContainer 
              renderDay={(day, month, year) => (
                  <View style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 0 }}>
                      <Text>{day}</Text>
                  </View>
              )}
          /> 
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});