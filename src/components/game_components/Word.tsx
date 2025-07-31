// A Word is a component containing a collection of Letter components.
// Logic determining the LetterState of each letter is contained here.

import { View, Text, StyleSheet } from "react-native";
import Letter from "./Letter";
import { LetterState, letterSize } from "./Letter";
import React, { ReactNode } from "react";


/** 
 * Solved: The word has been solved.
 * 
 * UserSolving: This is the word that has been assigned to the user.
 * 
 * OtherSolving: This is the word that has been assigned to the other user.
 * 
 * Unsolved: This word is completely blank. It has neither been solved nor is being solved by anyone.
 *
 * WarningDiagram: word displayed by the "your word does not meet the given hints" warning popup. 
 * Identical to UserSolving, except that the input cursor is not rendered. 
 * 
 * Note: we are assuming that since the only hints being given are for the word being solved by the user,
 * the only words with hint letters are those in WordState 1 or 2 (UserSolving or OtherSolving, respectively).
 * @enum
*/
export const WordState = {Solved: 0, UserSolving: 1, OtherSolving: 2, Unsolved: 3, WarningDiagram: 4};

// TODO: Add more info here on types -- copy from func signature?
interface WordProps {
    wordData: string,
    wordState: number,
    input: string
}

/**
 * 
 * @param {string} wordData - Word to render (with all blanks ("*") included).
 * @param {WordState} wordState - WordState representing the word's "state" (solved, unsolved, etc). Determines how it renders.
 * @param {string} input - If word is partially solved, input string is used to fill in blank spaces. Leave empty if wordState != UserSolving.
 */
export default function Word({wordData, wordState, input}: WordProps) {
    // the "stuff" rendered by the word. Changes depending on the WordState. 
    // If wordState is Solved, content consists of 1 text element. Otherwise it is a series of Letter elements
    // in a stylized container (the content of the letters and the container style varies based on wordState)
    let content: ReactNode[] = [];
    // If the word has been solved, render it as text.
    if(wordState === WordState.Solved) {
        content[0] = <Text key={0} style={styles.wordTextSolved}>{wordData}</Text>;
    }
    // If the word is unsolved, render it as a series of blank letters.
    else if(wordState === WordState.Unsolved) {
        for(let i = 0; i < wordData.length; i++) content[i]=<Letter key={i} char=' ' state={LetterState.Empty}/>;
    }
    // If this code is reached, the word is partially solved (assigned to user or other user)
    else {
        // map the word data to an array of letters. Characters indicating blanks ("*") are rendered as spaces.
        // at this point, if a letter is filled in, it's becuase it is a hint.
        content = Array.from(wordData).map((e: string,i: number) => <Letter 
            char={e!= "*" ? e: " "} 
            key={i} 
            state={e != "*" ? LetterState.Hint: LetterState.Normal}/>);
        // if we are solving this, that means we need to fill in additional letters according to user input.
        if(wordState === WordState.UserSolving || wordState === WordState.WarningDiagram) {
            for(let i = 0; i < wordData.length; i++) {
                // how does our user letter look?
                let userLetter;
                let userLetterState = LetterState.Normal;
                
                // determine if the letter is where the cursor is
                // note we do not show the cursor in the WarningDiagram version.
                if(i===input.length && wordState === WordState.UserSolving) userLetter = <Letter char={" "} key={i} state={LetterState.Active}/>;
                else {
                    // make the letter red if it does not line up with our hints
                    if(i < input.length && wordData[i] != "*" && wordData[i].toLowerCase() !== input[i].toLowerCase()) userLetterState = LetterState.Incorrect;
                    // in the warning popup we want unfilled characters to be highlighted in red, too.
                    if(i >= input.length && wordState === WordState.WarningDiagram) userLetterState = LetterState.Incorrect;
                    // create the object
                    userLetter = <Letter char={i < input.length ? input[i]: " "} key={i} state={userLetterState}/>;
                }
                
                const hintLetter = <Letter char={wordData[i] != "*" ? wordData[i] : "?"} key={i+0.5} state={LetterState.Hint}/>

                content[i] = <View style={{flexDirection:"column"}} key={i}>
                    {hintLetter}
                    {userLetter}
                    <Text style={styles.wordIncorrectText}>{userLetterState === LetterState.Incorrect ? "X": ""}</Text>
                </View>
            }
        }
        
    }

    // get the word style based on wordState. 
    // As with Letter.js, I couldn't get the switch statement to behave
    // when it was used as part of the variable assignment.
    let style;
    switch(wordState) {
        case WordState.Solved:
            style = null;
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
        case WordState.WarningDiagram:
            style = styles.wordNormalContainer;
            break;
        default: 
            style = styles.wordWarningDiagramContainer;
            break;
    }

    return (
        <View style={[styles.wordNormalContainer, style]}>{content}</View>
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
        justifyContent: 'center',
        marginRight: 20,
        marginBottom: 50,
    },
    wordUserSolvingContainer: {
        backgroundColor:'#eef',
        borderColor: '#34a',
        borderWidth: 2,
        borderRadius: 1,
    },
    wordOtherSolvingContainer: {
        backgroundColor:'#fee',
        borderColor: '#a34',
        borderWidth: 2,
        borderRadius: 1,
    },
    wordWarningDiagramContainer: {
        backgroundColor:'#eee',
        borderColor: '#aaa',
        borderWidth: 2,
        borderRadius: 1,
        flexDirection:'row',
    },
    wordErrorContainer: {
        backgroundColor:'#f00',
    },
    wordIncorrectText: {
        color: '#830',
        textAlign:'center',
        textAlignVertical: 'top',
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 0,
        //backgroundColor: '#000'
    }
});