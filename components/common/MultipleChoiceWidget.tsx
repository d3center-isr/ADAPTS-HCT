import { Pressable, View, Text, StyleSheet, GestureResponderEvent, ActivityIndicatorBase } from "react-native";
import { useState, ReactNode } from "react";
import TextButton from "./TextButton";

/**
 * A basic type to store information on how an MC button should look like.
 * @param {string} textToDisplay: the text that should be shown on the button
 * @param {string} color: a hexidecimal color code used for the button's background color.
 */
export type MultipleChoiceButtonData = {
    textToDisplay: string,
    color: string
}

interface MultipleChoiceWidgetProps {
    buttonData: MultipleChoiceButtonData[],
    activeButtonId: number,
    setActiveButtonId: React.Dispatch<React.SetStateAction<number>>,
}

interface MultipleChoiceButtonProps {
    data: MultipleChoiceButtonData,
    isActive: boolean,
    buttonId: number,
    onPress: (GestureResponderEvent) => void
}

/**
 * A single button in the MC Panel. 
 * @param {MultipleChoiceButtonData} data: is used to determine button color and text of the button
 * @param {boolean} isActive: whether the button has been selected or not. Determined in MultipleChoicePanel
 * by comparing the "active" state var to the id's of all buttons.
 * @param {number} buttonId: a numeric id of the button, corresponding to the index of the button within the buttonData
 * array used to populate the panel. 
 * @param {(GestureResponderEvent) => void} a state setter fed in by MCPanel to update the active state.
 *  
 */
function MultipleChoiceButton({data, isActive, buttonId, onPress}: MultipleChoiceButtonProps) {
    return (
        <TextButton 
            text = {data.textToDisplay}
            buttonStyle={[{borderColor: isActive ? "#fff": "#000", backgroundColor: data.color}]} 
            textStyle={{color: "#000"}}
            onPress={()=>onPress(buttonId)}
        />
    );
}

/**
 * Customizable scaling panel that displays a series of buttons based on data. Pressing a button
 * in this panel will cause it to become "active", but only one button can be active at a time. 
 * 
 * @param {MultipleChoiceButtonData[]} buttonData: A list of data for buttons.
 * The number of entries in this list corresponds to the number of buttons generated.
 * @param {number} activeButtonId: React State. The index of the currently active button. -1 if no button is active.
 * @param {React.Dispatch<React.SetStateAction<number>>} setActiveButtonId: The React method for updating the state of "activeButtonId".
 * 
 * Make sure that active and setActive are the [var, setVar] pair of a react useState.
 */
export default function MultipleChoiceWidget({buttonData, activeButtonId, setActiveButtonId}: MultipleChoiceWidgetProps) {

    function mcButtonHandler(key: number) {
        setActiveButtonId(key);
    }

    const content: ReactNode[] = buttonData.map((e,i) => {
        return <MultipleChoiceButton key={i} buttonId={i} data={e} isActive={i==activeButtonId} onPress={mcButtonHandler}/>;
    });

    return (
        <View style={styles.buttonView}>{content}</View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
    },
    buttonView: {
        flexDirection: "row",
        marginTop: 10,
    },
});