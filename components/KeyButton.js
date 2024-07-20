/**
 * Individual Keyboard button logic.
 */

import { useState } from "react";
import { Pressable, View, Text } from "react-native";
import { StyleSheet } from "react-native";

export default function KeyButton({keyText, onPress}) {
    return (
        <Pressable 
        onPressIn={()=>{onPress(keyText)}} 
        style={[styles.keyButton, {
                // we want the button to be larger in the case of longer key strings
                flex: keyText.length > 1 ? 0.2: 0.1,
            }]}
        >
            <Text style={[styles.keyButtontext, {fontSize:keyText.length>1?12:20}]}>{keyText}</Text>
        </Pressable>
    );

    
}

const styles = StyleSheet.create({
    keyButton: {
        backgroundColor: "#3a4466",
        borderColor: "#262b44",
        borderRadius: 4,
        borderWidth:4,
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