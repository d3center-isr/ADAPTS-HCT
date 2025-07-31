/**
 * A common interface to create a button containing text.
 * If you need any kind of button, use this component. 
*/
import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { Pressable, Text, StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native';

type TextButtonProps = {
    text: string;
    onPress: (event: GestureResponderEvent) => void;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
};
/**
 * A common interface to create a button containing text.
 * If you need any kind of button, use this component. 
 * @param test {string} The text to display on the button.
 * @param onPress {(GestureResponderEvent) => void} The function to call once the button is pressed.
 * @param buttonStyle {StyleProp<ViewStyle>} A set of style overrides for the button
 * @param textStyle {StyleProp<TextStyle>} A set of style overrides for the text
 */
const TextButton: React.FC<TextButtonProps> = ({
    text,
    onPress,
    buttonStyle,
    textStyle,
}) => (
    <Pressable style={[styles.button, buttonStyle]} onPress={onPress}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
    </Pressable>
);
const styles = StyleSheet.create({
    button: {
        backgroundColor: "#3a4466",
        borderColor: "#262b44",
        borderRadius: 3,
        borderWidth:3,
        justifyContent:'center',
        margin:1,
        padding: 4,
    },
    text: {
        color: '#dde',
    }
});

export default TextButton;