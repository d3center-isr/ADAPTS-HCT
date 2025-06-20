import { Pressable, View, Text, StyleSheet, GestureResponderEvent, ActivityIndicatorBase } from "react-native";
import { useState, ReactNode } from "react";

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
    active: number,
    setActive: React.Dispatch<React.SetStateAction<number>>,
}

interface MultipleChoiceButtonProps {
    data: MultipleChoiceButtonData,
    active: boolean,
    id: number,
    onPress: (GestureResponderEvent) => void
}

/**
 * A single button in the MC Panel. 
 * @param {MultipleChoiceButtonData} data: is used to determine button color and text of the button
 * @param {boolean} active: whether the button has been selected or not. Determined in MultipleChoicePanel
 * by comparing the "active" state var to the id's of all buttons.
 * @param {id} a numeric id of the button, corresponding to the index of the button within the buttonData
 * array used to populate the panel. 
 * @param {(GestureResponderEvent) => void} a state setter fed in by MCPanel to update the active state.
 *  
 */
function MultipleChoiceButton({data, active, id, onPress}: MultipleChoiceButtonProps) {
    return (
        <Pressable
            style={[styles.button, {borderColor: active ? "#fff": "#000", backgroundColor: data.color}]} 
            onPress={()=>{onPress(id)}}
        >
            <Text>{data.textToDisplay}</Text>
        </Pressable>
    );
}

/**
 * Customizable scaling panel that displays a series of buttons based on data. Pressing a button
 * in this panel will cause it to become "active", but only one button can be active at a time. 
 * 
 * @param {MultipleChoiceButtonData[]} buttonData: A list of data for buttons.
 * The number of entries in this list corresponds to the number of buttons generated.
 * @param {number} active: React State. The index of the currently active button. -1 if no button is active.
 * @param {React.Dispatch<React.SetStateAction<number>>} setActive: The React method for updating the state of "active".
 * 
 * Make sure that active and setActive are the [var, setVar] pair of a react useState.
 */
export default function MultipleChoiceWidget({buttonData, active, setActive}: MultipleChoiceWidgetProps) {

    function mcButtonHandler(key: number) {
        setActive(key);
    }

    let content: ReactNode[] = buttonData.map((e,i) => {
        return <MultipleChoiceButton key={i} id={i} data={e} active={i==active} onPress={mcButtonHandler}/>;
    });

    content.length = buttonData.length;
    return (
        <View style={styles.buttonView}>{content}</View>
    );
}

let styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
    },
    button: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 2,
        borderRadius: 10,
        marginLeft:5,
        marginRight:5,
    },
    buttonView: {
        flexDirection: "row",
        marginTop: 10,
    },
});