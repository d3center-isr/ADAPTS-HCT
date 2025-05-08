// A Letter component is the component containing a single letter/character.
// Letter components are used to render Unsolved and Partially solved words. 
// (completed words are rendered using plain text, not the Letter component).

import { Text,View } from "react-native";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/**
 * Enumeration describing the state of a Letter. Used to determine how it renders.
 * 
 * Normal: Letter rendered through input by the player.
 * 
 * Hint: Letter rendered as part of a hint. 
 * 
 * Empty: Blank letter rendered as part of an empty, unassigned word.
 * 
 * Active: Represents "cursor"; This letter is the letter that will be written to on the next keypress.
 * 
 * Incorrect: Used to represent an inputted letter that does not correspond to the hint at its position.
 * (eg, if the hint is "**t", and the input is "ear", the third letter would be Incorrect)
 */
export const LetterState = {Normal: 0, Hint: 1, Empty: 2, Active: 3, Incorrect: 4}

// letter dimensions (these are proportions of the window dimensions, 
// eg. "0.1" is "1/10th of the window width")
const letterWidth = 0.1;
export const letterSize=letterWidth*100*2;
//const letterHeight = 0.075;

/**
 * 
 * @param {string} char - a length 1 string for the letter to display
 * @param {LetterState} state - the state of the letter.
 * @returns - letter component
 */
export default function Letter({char, state, hintChar}) {
    // get the style of the word based on the state
    // for some reason I couldn't get the switch statement to go into
    // the variable assignment, so here it is.

    // TODO: Find a better way to do this, this code is gross.
    let textStyle;
    let containerStyle;
    switch(state) {
        case LetterState.Normal: 
            containerStyle = styles.letterNormalContainer;
            textStyle = styles.letterNormal;
            break;
        case LetterState.Hint: 
            containerStyle = styles.letterNormalContainer;
            textStyle = styles.letterHint;
            break;
        case LetterState.Empty:
            containerStyle = styles.letterNormalContainer;
            textStyle = styles.letterNormal;
            break;
        case LetterState.Active:
            containerStyle = styles.letterActiveContainer;
            textStyle = styles.letterNormal;
            break;
        case LetterState.Incorrect:
            containerStyle = styles.letterIncorrectContainer;
            textStyle = styles.letterNormal;
            break;
        default: 
            containerStyle = styles.letterNormalContainer;
            textStyle = styles.letterError;
            break;
    }

    // if this is normal text, add some spaces so that the underline is more visible.
    let renderText = textStyle===styles.letterNormal? " " + char + " " : char; 

    
    return (
        <View style={[containerStyle,
            {
                width: letterWidth*windowWidth,
                height: letterWidth*windowWidth
            }
        ]}>
            <Text style={textStyle}>{renderText}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    letterNormalContainer: {
        alignSelf:'baseline',
        justifyContent:'center',
        margin:1,
    },

    letterActiveContainer: {
        borderColor: "#333",
        backgroundColor: "#fff",
        borderWidth:1,
        alignSelf:'center',
        justifyContent:'center',
        margin:1,
    },

    letterIncorrectContainer: {
        borderColor: "#843",
        backgroundColor: "#ffe0dd",
        borderWidth:1,
        alignSelf:'center',
        justifyContent:'center',
        margin:1,
    },
    
    letterNormal: {
        color:"#000",
        fontSize: letterSize,
        textAlign:'center',
        textAlignVertical:'center',
        fontWeight:'bold',
        padding: 0,
        textDecorationLine: 'underline',
    },

    letterHint: {
        color:"#008",
        fontSize: letterSize,
        textAlign:'center',
        textAlignVertical:'top',
        fontWeight:'bold',
        padding: 0,
    },

    letterError: {
        color:"#fcc",
        fontSize: letterSize,
        textAlign:'center',
        textAlignVertical:'top',
        fontWeight:'bold',
        padding: 0,
    },

    letterEmpty: {
        color:"#000",
        fontSize: letterSize,
        textAlign:'center',
        textAlignVertical:'top',
        fontWeight:'bold',
        padding: 0,
    },
});