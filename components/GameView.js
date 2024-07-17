import { View,StyleSheet, Text } from "react-native";
import Letter from "./Letter";
import Word from "./Word";
import { WordState } from "./Word";


// We store the sentence as an array of Word elements, and then render them.
export default function GameView({puzzle, input, playerWord, otherWord}) {

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
        //console.log(i + " " + wordData);
        console.log(i + " " + wordState);
    }

    return (
        <View style={styles.container}>
            <View style={styles.lettersContainer}>{content}</View>
        </View>
    );
}

// Returns true if a word is unsolved (eg. all blank characters)
// '*' is the designated blank character.
function isBlank(word) {
    Array.from(word).forEach((e)=>{
        if(e !== "*") return false;
    });
    return true;
}

// Returns true if a word is solved (eg. no blank characters)
// '*' is the designated blank character.
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

  