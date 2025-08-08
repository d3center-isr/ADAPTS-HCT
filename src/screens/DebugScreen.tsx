/**
 * A screen used solely to test components, as well as connect to additional testing screens. 
 * This screen should not be visible to the average user.
 */

import { ReactNode, useState, useContext } from "react";
import { Pressable, Text, View, Image, Linking } from "react-native";
import { StyleSheet } from "react-native-web";
// imported functions
import { sendPushNotification } from "../utils/NotificationHandler";
// imported components
import MultipleChoiceWidget from "../components/common/MultipleChoiceWidget";
import { MultipleChoiceButtonData } from "../components/common/MultipleChoiceWidget";
import GenericPopup from "../components/common/GenericPopup";
import TextButton from "../components/common/TextButton";
import CountdownTimer from "../components/CountdownTimer";


const DEBUG_WEBVIEW_URL = "https://tnaqua.org/live/penguins-rock/";
// context
import { NotificationTokenContext } from "../utils/NotificationHandler";
import LinkButton from "components/common/LinkButton";

// TODO: Add typedoc info on the type of "navigation" -- seriously what is it?
export default function DebugScreen() {
  const [showTestPopup, setShowTestPopup] = useState(false);

  const notificationToken: string = useContext(NotificationTokenContext);

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
          <LinkButton url="./debug/calendar-test" text={"Navigate to Calendar Test Screen"}/>
          {/* Countdown Timer Testing */}
          <CountdownTimer countdownTarget={new Date(2025, 6, 3)} countdownReference={new Date(2024, 6, 2)}/>
          <CountdownTimer countdownTarget={new Date(2024, 6, 3)} countdownReference={new Date(2025, 6, 2)}/>
          <CountdownTimer countdownTarget={new Date(2025, 8, 2)} showTarget={true}/>
          <CountdownTimer countdownTarget={new Date(2026, 7, 31)}/>

          <TextButton text={"Send Notification"} onPress={()=> {
              sendPushNotification(notificationToken, "This is an in-app notification!", 
                "You can test push notifications by going to https://expo.dev/notifications. Enter "
                + notificationToken + " as the push token, give it a title and body, and press send!"
                + "You can also find the push token in the console log.")
          }}/>
          <TextButton text={"Send Image Notification"} onPress={()=> {
              sendPushNotification(notificationToken, "This is an Image Notification!","Me when coding:",
                 "https://www.kaiyukan.com/assets/img/info/area/shop/img01-02.jpg")
          }}/>
          <TextButton text={"Send Link Notification"} onPress={()=> {
              sendPushNotification(notificationToken, "This is a Link Notification!","Click this notification to see a cool message.",
                 "", "adaptshct://messages/view?messageName=debug_giftest")
          }}/>

          <GenericPopup visible={showTestPopup} horizontalMargins={0.04}>
            <Text>Medication Reporting Widget</Text>
            <TextButton onPress={()=>setShowTestPopup(false)} text="Close Widget"/>
          </GenericPopup>
          {/* Webview Screen Testing */}
          <LinkButton url={"/web?url=" + DEBUG_WEBVIEW_URL} text="Test Webview Screen"/>
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
      <Image style={{flex: 0.25, aspectRatio: 1}}source={require("assets/placeholders/debug-penguin-helmet.png")}/>
      <Text style={{flex: 0.5}}>Welcome to the Testing zone! This is a Developer Menu meant for feature testing.</Text>
      <Image style={{flex: 0.25, aspectRatio: 1, transform: [{ scaleX: -1 }]}}source={require("assets/placeholders/debug-penguin-helmet.png")}/>
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
  // console.log("Num options: " + buttonData.length);
  const [mcActive, setMCActive] = useState(-1);
  return <MultipleChoiceWidget buttonData={buttonData} activeButtonId={mcActive} setActiveButtonId={setMCActive}/>
}
  