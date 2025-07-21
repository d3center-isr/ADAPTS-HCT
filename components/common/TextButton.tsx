import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { Pressable, Text, StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native';

type TextButtonProps = {
    text: string;
    onPress: (event: GestureResponderEvent) => void;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
};

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