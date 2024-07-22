// A Word is a component containing a collection of Letter components.
// Logic determining the LetterState of each letter is contained here.

import { View, Text, StyleSheet } from "react-native";
import Letter from "./Letter";
import { LetterState, letterSize } from "./Letter";


/**
 * Pretty much just an enumerator.
 * 
 * @ Solved: The word has been solved.
 * 
 * @ UserSolving: This is the word that has been assigned to the user.
 * 
 * @ OtherSolving: This is the word that has been assigned to the other user.
 * 
 * @ Unsolved: This word is completely blank. It has neither been solved nor is being solved by anyone.
 * 
 * @ Note: we are assuming that since the only hints being given are for the word being solved by the user,
 * 
 * the only words with hint letters are those in WordState 1 or 2.
*/
export const WordState = {Solved: 0, UserSolving: 1, OtherSolving: 2, Unsolved: 3};


/**
 * 
 * @param {string} wordData - Word to render (with all blanks ("*") included).
 * @param {WordState} wordState - WordState representing the word's "state". Determines how it renders.
 * @param {string} input - string used to fill in blank spaces. Leave empty if wordState != UserSolving.
 */
export default function Word({wordData, wordState, input}) {
    let content;

    // If the word has been solved, simply render it as text.
    if(wordState === WordState.Solved) {
        content = <Text style={styles.wordTextSolved}>{wordData}</Text>;
    }
    // If the word is unsolved, simply render it as a bunch of blank letters.
    else if(wordState === WordState.Unsolved) {
        content = Array(wordData.length);
        for(let i = 0; i < content.length; i++) content[i]=<Letter key={i} char=' ' state={LetterState.Empty}/>;
    }
    // OK, so this word is partially solved, meaning it is either being solved by other  or this user.
    else {
        // map the word data to an array of letters. Characters indicating blanks ("*") are rendered as spaces.
        // at this point, if a letter is filled in, it's becuase it is a hint.
        content = Array.from(wordData).map((e,i)=><Letter 
            char={e!= "*" ? e: " "} 
            key={i} 
            state={e != "*" ? LetterState.Hint: LetterState.Normal}/>);
        // if we are solving this, that means we need to fill in additional letters according to user input.
        if(wordState === WordState.UserSolving) {
            // iterate through the word and fill in blank spaces with our keyboard input as we go.
            let j = 0;
            for(let i = 0; i < wordData.length; i++) {
                if(wordData[i] == "*") {
                    // we need to also get where our "cursor is" to indicate where we are typing.
                    if(j===input.length)content[i] = <Letter char={" "} key={i} state={LetterState.Active}/>;
                    else if (j<input.length)content[i] = <Letter char={input[j]} key={i} state={LetterState.Normal}/>;
                    j++;
                }
            }
        }
        
    }

    // get the word style based on wordState. 
    // As with Letter.js, I couldn't get the switch statement to behave
    // when it was used as part of the variable assignment.
    let style;
    switch(wordState) {
        case WordState.Solved:
            style = styles.wordNormalContainer;
            break;
        case WordState.UserSolving:
            style = styles.wordUserSolvingContainer;
            break;
        case WordState.OtherSolving:
            style = styles.wordOtherSolvingContainer;
            break;
        case WordState.Unsolved:
            style = styles.wordNormalContainer;
            break;
        default: 
            style = styles.wordErrorContainer;
            break;
    }

    return (
        <View style={style}>{content}</View>
    );
}

const styles = StyleSheet.create({
    wordTextSolved: {
        color:"#000",
        fontSize: letterSize,
        textAlign:'left',
        alignSelf:'flex-start',
        textAlignVertical:'top',
        fontWeight:'bold',
        padding: 0,
        marginBottom: 0,
    },
    wordNormalContainer: {
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems: 'flex-start',
        alignSelf: 'baseline',
        flexWrap:'wrap',
        justifyContent: 'center',
        marginRight: 20,
        marginBottom: 50,
    },
    wordUserSolvingContainer: {
        backgroundColor:'#eef',
        borderColor: '#34a',
        borderWidth: 2,
        borderRadius: 1,
        flexDirection:'row',
        alignItems: 'flex-start',
        alignSelf: 'baseline',
        flexWrap:'wrap',
        justifyContent: 'center',
        marginRight: 20,
        marginBottom: 50,
        
    },

    wordOtherSolvingContainer: {
        backgroundColor:'#fee',
        borderColor: '#a34',
        borderWidth: 2,
        borderRadius: 1,
        flexDirection:'row',
        alignItems: 'flex-start',
        alignSelf: 'baseline',
        flexWrap:'wrap',
        justifyContent: 'center',
        marginRight: 20,
        marginBottom: 50,
    },

    wordErrorContainer: {
        backgroundColor:'#f00',
        flexDirection:'row',
        alignItems: 'flex-start',
        alignSelf: 'baseline',
        flexWrap:'wrap',
        justifyContent: 'center',
        marginRight: 20,
        marginBottom: 50,
    },
});