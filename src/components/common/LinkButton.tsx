/**
 * A common interface to create a button containing text.
 * If you need any kind of button, use this component. 
*/
import { Link, router } from 'expo-router';
import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { ViewStyle, TextStyle, StyleProp } from 'react-native';
import TextButton from './TextButton';

type LinkButtonProps = {
    text: string;
    url: string;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
};
/**
 * A common interface for navigation buttons -- It's a TextButton under the hood. 
 * @param test {string} The text to display on the button.
 * @param url {string} The expo router link to navigate to.
 * @param buttonStyle {StyleProp<ViewStyle>} A set of style overrides for the button
 * @param textStyle {StyleProp<TextStyle>} A set of style overrides for the text
 */
const LinkButton: React.FC<LinkButtonProps> = ({
    text,
    url,
    buttonStyle,
    textStyle,
}) => (
    <TextButton onPress={()=>{router.navigate(url)}} text={text} buttonStyle={buttonStyle} textStyle={textStyle}/>
);


export default LinkButton;