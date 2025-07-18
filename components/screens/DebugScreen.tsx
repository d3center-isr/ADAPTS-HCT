import { ReactNode, useState } from "react";
import { Pressable, Text, View, Image } from "react-native";
import { StyleSheet } from "react-native-web";
// imported components
import MultipleChoiceWidget from "../MultipleChoiceWidget";
import { MultipleChoiceButtonData } from "../MultipleChoiceWidget";
import GenericPopup from "../GenericPopup";
import CountdownTimer from "../CountdownTimer";


const DEBUG_WEBVIEW_URL = "https://tnaqua.org/live/penguins-rock/";

// TODO: Add typedoc info on the type of "navigation" -- seriously what is it?
export default function DebugScreen({navigation}) {
  const [showTestPopup, setShowTestPopup] = useState(false);

  return (
      <View style={{ flex: 1, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', margin:5}}>
          {/* Header -- images and text in the middle */}
          <Image style={{flex: 0.25, aspectRatio: 1}}source={require("../../assets/placeholders/debug-penguin-helmet.png")}/>
          <Text style={{flex: 0.5}}>Welcome to the Testing zone! This is a Developer Menu meant for feature testing.</Text>
          <Image style={{flex: 0.25, aspectRatio: 1, transform: [{ scaleX: -1 }]}}source={require("../../assets/placeholders/debug-penguin-helmet.png")}/>
        </View>
        <View>
          {/* Multiple Choice Demo Component */}
          <MultipleChoiceDemo/>
          <View style={{flex: 0.1}}/>
          {/* GenericPopup Testing */}
          <Pressable style={styles.navigationButton} onPress={()=>setShowTestPopup(true)}>
            <Text style={styles.navigationText}>Debug: Press to show Med Log Popup</Text>
          </Pressable>
          <GenericPopup visible={showTestPopup} horizontalMargins={0.04}>
            <Text>Medication Reporting Widget</Text>
            <Pressable style={styles.navigationButton} onPress={()=>setShowTestPopup(false)}>
              <Text style={styles.navigationText}>Close Widget</Text>
            </Pressable>
          </GenericPopup>
          {/* Calendar Testing */}
          <Pressable style={styles.navigationButton} onPress={()=> navigation.navigate('CalendarDemo')}>
            <Text style={styles.navigationText}>Navigate to Calendar Test Screen</Text>
          </Pressable>
          {/* Countdown Timer Testing */}
          <CountdownTimer countdownTarget={new Date(2025, 6, 3)} countdownReference={new Date(2024, 6, 2)}/>
          <CountdownTimer countdownTarget={new Date(2024, 6, 3)} countdownReference={new Date(2025, 6, 2)}/>
          <CountdownTimer countdownTarget={new Date(2025, 8, 2)} showTarget={true}/>
          <CountdownTimer countdownTarget={new Date(2026, 7, 31)}/>
          {/* Webview Screen Testing */}
          <Pressable style={styles.navigationButton} onPress={()=> navigation.navigate("Webview", {url: DEBUG_WEBVIEW_URL})}>
            <Text style={styles.navigationText}>Test Webview Screen</Text>
          </Pressable>
          
        </View>
      </View>
  );
}

/**
 * Example Demo of usage of a MultipleChoicePanel
 * Contains a set of 4 panels in a horizontal row. The "active" state corresponds to the index of 
 * the currently active panel (and -1 if none have been pressed)
 * Only for demonstration purposes.
 */
function MultipleChoiceDemo() {
  const buttonData: MultipleChoiceButtonData[] = [
    {
      textToDisplay: "Option 1",
      color: "#eee",
    },
    {
      textToDisplay: "Option 2",
      color: "#ddd",
    },
    {
      textToDisplay: "Option 3",
      color: "#ccc",
    },
    {
      textToDisplay: "Option 4",
      color: "#bbb",
    },
  ];
  console.log("Num options: " + buttonData.length);
  const [mcActive, setMCActive] = useState(-1);
  return <MultipleChoiceWidget buttonData={buttonData} activeButtonId={mcActive} setActiveButtonId={setMCActive}/>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'col',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navigationButton: {
        backgroundColor: "#3a4466",
        borderColor: "#262b44",
        borderRadius: 3,
        borderWidth:3,
        justifyContent:'center',
        margin:1,
        padding: 4,
    },
    navigationText: {
        color: '#dde',
    }
});
  