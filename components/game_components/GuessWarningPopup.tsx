import { Pressable, View } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { Modal } from "react-native";
import Word from "./Word";
import { WordState } from "./Word";
import GenericPopup from "../common/GenericPopup";


interface GuessWarningPopupProps {
    visible: boolean,
    hintData: string,
    onYesPress: ()=> any,
    onNoPress: ()=> any,
    input: string,
}

export default function GuessWarningPopup({visible, hintData, onYesPress, onNoPress, input}: GuessWarningPopupProps) {
    return (
        <GenericPopup visible = {visible} horizontalMargins={0.04}>
            <View style = {{alignItems: "center"}}>
                <Text style={styles.popupInfoText}>Heads up: your answer didn't match the hints you were given, and is guaranteed to be incorrect.</Text>
                <Word wordData={hintData} input={input} wordState={WordState.WarningDiagram}></Word>
                <Text>Would you like to submit your answer anyway?</Text>
                <View style={styles.buttonView}>
                    <Pressable style={[styles.button, {borderColor: "#843", backgroundColor: "#fdc"}]} onPress={onNoPress}><Text>No</Text></Pressable>
                    <Pressable style={[styles.button, {borderColor: "#384", backgroundColor: "#cfd"}]} onPress={onYesPress}><Text>Yes</Text></Pressable>
                </View>
            </View>
        </GenericPopup>
    );
}

const styles = StyleSheet.create({
    popupInfoText: {
        marginBottom: 25,
    },
    button: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 50,
        paddingRight: 50,
        borderWidth: 2,
        borderRadius: 10,
        marginLeft:25,
        marginRight:25,
    },
    buttonView: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginTop: 10,
    },
});