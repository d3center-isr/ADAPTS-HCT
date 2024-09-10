import { View,StyleSheet, Text } from "react-native";
import Word from "./Word";
import { WordState } from "./Word";


// We store the sentence as an array of Word elements, and then render them.
/**
 * 
 * @param {string} puzzle - The current state of the puzzle
 * @param {string} input - the current user input
 * @param {number} playerWord - the index of the word currently assigned to the player
 * @param {number} otherWord - the index of the word currently assigned to the other user.
 * @returns Game View components
 */
export default function PuzzleView({puzzle, input, playerWord, otherWord}) {

    let words = puzzle.split(" ");

    let content = Array(words.length);
    // manually mapping each word from the puzzle (with blanks) to a Word Component
    // we could do a map function here, but it just couldn't work for some reason.
    for(let i = 0; i < words.length; i++) {
        let wordData = words[i];
        let wordState = WordState.Unsolved;
        if(isSolved(words[i])) wordState = WordState.Solved;
        else if(i===playerWord) {
            wordState = WordState.UserSolving;
        } else if(i===otherWord) {
            wordState = WordState.OtherSolving;
        }
        
        content[i] = <Word wordData={wordData} wordState={wordState} input={input} key={i}/>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.lettersContainer}>{content}</View>
        </View>
    );
}

/**
 * 
 * @param {string} word 
 * @returns true if word only contains blank chars ("*"), false if otherwise.
 */
function isBlank(word) {
    Array.from(word).forEach((e)=>{
        if(e !== "*") return false;
    });
    return true;
}

/**
 * 
 * @param {string} word 
 * @returns true if word contains no blank characters ("*"), false if otherwise.
 */
function isSolved(word) {
    for(let i = 0; i < word.length; i++) if(word[i] === "*") return false;
    return true;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eff",
        flex: 0.7,
        flexDirection:'col',
        backgroundColor: '#fff',
        justifyContent: 'center',
        
    },
    lettersContainer: {
        flex: 1,
        backgroundColor:'#fff',
        flexDirection:'row',
        // this determines how items are aligned within the container
        justifyContent: 'center',
        // this makes elements wrap when going over the view bounds.
        // this is placed here and not in Word.js so that words wrap, 
        // but individual letters do not.
        flexWrap:'wrap',
        marginTop:50,
        padding:5,
      },
  });

  