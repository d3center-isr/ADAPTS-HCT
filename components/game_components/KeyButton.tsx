/**
 * Individual Keyboard button logic.
 */
import { Pressable, View, Text } from "react-native";
import { StyleSheet } from "react-native";
import TextButton from "../common/TextButton";

interface KeyButtonProps {
    keyText: string,
    onPress: (keyText: string) => void
}

export default function KeyButton({keyText, onPress}: KeyButtonProps) {
    return (
        <TextButton
            text={keyText}
            onPress={()=>{onPress(keyText)}}
            buttonStyle={[styles.keyButton, {
                // we want the button to be larger in the case of longer key strings
                flex: keyText.length > 1 ? 0.2: 0.1,
            }]}
            textStyle={[styles.keyButtontext, {fontSize:keyText.length>1?12:20}]}
        />
    );

    
}

const styles = StyleSheet.create({
    keyButton: {
        flex: 100,
        justifyContent:'center',
        margin:1,
        padding: 2,
    },
    
    keyButtontext: {
        color:"#fff",
        fontSize: 20,
        textAlign:'center',
        textAlignVertical: 'center',
    }
    
});