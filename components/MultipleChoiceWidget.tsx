import { Pressable, View, Text, StyleSheet, GestureResponderEvent } from "react-native";
import { useState, ReactNode } from "react";

export type MultipleChoiceButtonData = {
    textToDisplay: string,
    color: string
}

interface MultipleChoiceWidgetProps {
    buttonData: MultipleChoiceButtonData[]
}

interface MultipleChoiceButtonProps {
    data: MultipleChoiceButtonData,
    active: boolean,
    id: number,
    onPress: (GestureResponderEvent) => void
}


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

export default function MultipleChoiceWidget({buttonData}: MultipleChoiceWidgetProps) {
    const [active, setActive] = useState(-1);

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