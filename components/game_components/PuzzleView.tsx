import { View,StyleSheet, Text } from "react-native";
import Word from "./Word";
import { WordState } from "./Word";
import { ReactNode } from "react";


interface PuzzleViewProps {
    puzzle: string,
    input: string,
    playerWord: number,
    otherWord: number
}

// We store the sentence as an array of Word elements, and then render them.
/**
 * 
 * @param {string} puzzle - The current state of the puzzle
 * @param {string} input - the current user input
 * @param {number} playerWord - the index of the word currently assigned to the player
 * @param {number} otherWord - the index of the word currently assigned to the other user.
 * @returns Game View components
 */
export default function PuzzleView({puzzle, input, playerWord, otherWord}: PuzzleViewProps) {

    const words: string[] = puzzle.split(" ");

    let content: ReactNode[] = Array(words.length);
    // manually mapping each word from the puzzle (with blanks) to a Word Component
    // we could do a map function here, but it just couldn't work for some reason.
    for(let i = 0; i < words.length; i++) {
        const wordData: string = words[i];
        let wordState: number = WordState.Unsolved; // TODO: Make WordState an actual type?
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
function isBlank(word: string) {
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
function isSolved(word: string) {
    for(let i = 0; i < word.length; i++) if(word[i] === "*") return false;
    return true;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eff",
        flex: 0.7,
        flexDirection:'column',
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

  