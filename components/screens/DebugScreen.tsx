import { ReactNode, useState } from "react";
import { Pressable, Text, View, Image } from "react-native";
import { StyleSheet } from "react-native-web";
// imported components
import MultipleChoiceWidget from "../common/MultipleChoiceWidget";
import { MultipleChoiceButtonData } from "../common/MultipleChoiceWidget";
import GenericPopup from "../common/GenericPopup";
import TextButton from "../common/TextButton";
import CountdownTimer from "../CountdownTimer";


// TODO: Add typedoc info on the type of "navigation" -- seriously what is it?
export default function TitleScreen({navigation}) {
  const [showTestPopup, setShowTestPopup] = useState(false);

  return (
      <View style={{ flex: 1, alignItems: 'center'}}>
        <DebugHeader/>
        <View>
          {/* Multiple Choice Demo Component */}
          <MultipleChoiceDemo/>
          <View style={{flex: 0.1}}/>
          {/* GenericPopup Testing */}
          <TextButton onPress={()=>setShowTestPopup(true)} text={"Debug: Press to show Med Log Popup"}/>
          {/* Calendar Testing */}
          <TextButton onPress={()=>navigation.navigate('CalendarDemo')} text={"Navigate to Calendar Test Screen"}/>
          {/* Countdown Timer Testing */}
          <CountdownTimer countdownTarget={new Date(2025, 6, 3)} countdownReference={new Date(2024, 6, 2)}/>
          <CountdownTimer countdownTarget={new Date(2024, 6, 3)} countdownReference={new Date(2025, 6, 2)}/>
          <CountdownTimer countdownTarget={new Date(2025, 8, 2)} showTarget={true}/>
          <CountdownTimer countdownTarget={new Date(2026, 7, 31)}/>

          <GenericPopup visible={showTestPopup} horizontalMargins={0.04}>
            <Text>Medication Reporting Widget</Text>
            <TextButton onPress={()=>setShowTestPopup(false)} text={"Close Widget"}/>
          </GenericPopup>
        </View>
      </View>
  );
}

/**
 * A fun little header for the debug screen containing images sandwiching a text element.
 * This element has no use other than to be a fun thing on the debug screen, and nothing should depend on this component. 
 * 
 * It'll probably be removed at some point -- enjoy it while it lasts.
 */
function DebugHeader() {
  return (
    <View style={{flexDirection: 'row', margin:5}}>
      {/* Header -- images and text in the middle */}
      <Image style={{flex: 0.25, aspectRatio: 1}}source={require("../../assets/placeholders/debug-penguin-helmet.png")}/>
      <Text style={{flex: 0.5}}>Welcome to the Testing zone! This is a Developer Menu meant for feature testing.</Text>
      <Image style={{flex: 0.25, aspectRatio: 1, transform: [{ scaleX: -1 }]}}source={require("../../assets/placeholders/debug-penguin-helmet.png")}/>
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
  