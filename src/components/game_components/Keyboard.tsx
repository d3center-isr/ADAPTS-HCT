/**
 * Keyboard component used in the Game. Reads input from KeyButton inputs and feeds into a provided output variable. 
 */

import {View} from 'react-native';
import { StyleSheet } from 'react-native';
import KeyButton from './KeyButton';

interface KeyboardProps {
    output: string,
    setOutput: (toSet: string) => void,
    maxOutputLength: number,
    onSubmit: () => void
}


// Parameters:
// - output is a string-type React State. It is the keyboard's current output.
// DO NOT change output outside of this function.
// - setOutput: output setter function
// - maxOutputLength. Not modified by this component. Maximum size for the keyboard output.
/**
 * Keyboard component used in the Game. Reads input from KeyButton inputs and feeds into a provided output variable. 
 * @param {string} output - keyboard output (this is a state)
 * @param {CallableFunction} setOutput - output state "setter" function
 * @param {string} maxOutputLength - Maximum length of the keyboard output.
 * @param {CallableFunction} onSubmit - function to call once the ENTER button is pressed.
 * @returns keyboard object composed of 3 keyboard rows.
 */
export default function Keyboard({output, setOutput, maxOutputLength, onSubmit}: KeyboardProps) {

    // keyboard pressing logic. This is passed down to each keyButton.
    // code to handle a single keypress. 
    const handleKeypress = (keyText: string) => {
        let newOutput = output;
        // submit answer using ENTER
        if(keyText==="ENTER") {
            onSubmit();
            return;
        }
        // ERASE serves as the backspace key
        // this code will not run if there is nothing in the keyboard output.
        else if(keyText==="ERASE") {
            if(output.length > 0) newOutput = output.slice(0,output.length-1);
        }
        // ordinary key handling
        else if(output.length < maxOutputLength) {
            newOutput = output.slice() + keyText;
        }
        setOutput(newOutput);
    }

    interface KeyboardRowProps {
        rowKeyTexts: string[]
    }

    /**
     * a keyboard row is a container for all of the keys on the row
     * we can configure which keys are shown in the row with the parameter rowKeyTexts,
     * which is an array of strings, each one corresponding to a key in the row. 
     * @param {Array(string)} rowKeyTexts - array of strings to convert into keys.
     * @returns array of KeyButton's in the order of rowKeyTexts
     */
    function KeyboardRow({rowKeyTexts}: KeyboardRowProps) {
        let keys = [];
        // map each element in the inputted array to a KeyButton element.
        // for some reason I could not get .map() to work in this case. Still no clue why.
        for(let i = 0; i < rowKeyTexts.length; i++) {
            keys[i] = <KeyButton keyText={rowKeyTexts[i]} key={i} onPress={(keyText)=>{handleKeypress(keyText)}}/>;
        }
        return (
            <View style={{
                flexDirection:"row",
                flex: 1,
                alignContent: 'center',
            }}>
                {keys}
            </View>
        );
    }

    // actual keyboard layout. You can edit the arrays here in order to change the order of keys 
    // (and which keys there are) in the keyboard.
    // You can have any number of any type of key, but the game does need an 'ENTER' key to run, 
    // and only an 'ERASE' key fills the backspace function.
    return (
        <View style={styles.container}>
            <KeyboardRow rowKeyTexts={  ['Q','W','E','R','T','Y','U','I','O','P']  }/>
            <KeyboardRow rowKeyTexts={    ['A','S','D','F','G','H','J','K','L']    }/>
            <KeyboardRow rowKeyTexts={['ERASE','Z','X','C','V','B','N','M','ENTER']}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 0.3,
      flexDirection:'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      margin:5,
    },
});