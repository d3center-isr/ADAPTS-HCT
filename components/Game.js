import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
  
// component imports
import Keyboard from './Keyboard';
import PuzzleView from './PuzzleView';
import { WordState } from './Word';

let stateToReturn = {

}

export default function Game() {
  // constants for keyboard input.
  // - digital keyboard output is stored in the keyboardOutput variable. It is a state modified by the keyboard, 
  // and should not be modified in this program except to clear its contents.
  // - maxKeyboardOutPutLength is the length limit for the keyboardOutput. 
  const [keyboardOutput, setKeyboardOutput] = useState("");
  // this is the answer key
  const [puzzleKey,setPuzzleKey] = useState("I love to eat pancakes");
  const [puzzle, setPuzzle] = useState("I **** to *** **n**k**");
  const playerWord = 4;
  const otherWord = 1;

  const maxKeyboardOutputLength = getBlankCount(puzzle.split(" ")[playerWord]);

  /**
   * splices input into word and returns result. Characters from input replace "*" characters in word.
   * Example: getSplicedWord("a*b*c*", "123") = a1b2c3, getSplicedWord("***", "abc") = "abc".
   * 
   * Since this is only called when making a guess, we are assuming that 
   * input.length >= number of "*" characters in word.
  */
  function getSplicedWord(word, input) {
    let j = 0;
    let toReturn = "";
    for(let i = 0; i < word.length; i++) {
      let letterToAdd;
      if(word[i] === "*") {
        letterToAdd = input[j];
        j++;
      }
      else letterToAdd = word[i];
      toReturn = toReturn.slice() + letterToAdd;
    }
    return toReturn;
  }

  /** 
   * Handles the logic for processing a submitted answer.
   * 
   * @note This function is only called when the keyboard input is "full".
  */
  function handleSubmit() {
    // we only want to submit our answer when the input field is completely filled up.
    // Also, if the input field is larger than it should be for some reason it would be nice
    // to catch that.
    if(keyboardOutput.length != maxKeyboardOutputLength) {
      console.log("Invalid submission attempt -- input either too long or too small.");
      return;
    }
    console.log("submitting...");
    
    let assignedWord = puzzle.split(" ")[playerWord];
    let toCheck = getSplicedWord(assignedWord, keyboardOutput);
    let answer = puzzleKey.split(" ")[playerWord];
    let updatedWord;
    let wasGuessCorrect;
    // let's make sure we're not being case sensitive when checking answers...
    if(toCheck.toLowerCase() == answer.toLowerCase()) {
      console.log("Correctly guessed word!");
      wasGuessCorrect = true;
      updatedWord = puzzleKey.split(" ")[playerWord];
    }
    else {
        console.log("You guessed the wrong word.");
        wasGuessCorrect = false;
        // we need to choose which blank to reveal.
        // here we get a list of blank space incdices in the word.
        let blankSpaces = [];
        for(let i = 0; i < assignedWord.length; i++) {
            if(assignedWord[i] === "*") blankSpaces.push(i);
        }
        // pick a random blank space to reveal:
        let charToReplace = blankSpaces[Math.floor(Math.random() * blankSpaces.length)];
        // now stitch the word together.
        updatedWord = assignedWord.split("");
        updatedWord[charToReplace] = answer[charToReplace];
        updatedWord = updatedWord.join("");
    }

    // now we need to update puzzle. Since we are not modifying strings, we will 
    // split puzzle and copy the words into a new string. When copying over the word we guessed, 
    // we will instead copy over the word from the answer key.
    let wordsToCopy = puzzle.split(" ");
    wordsToCopy[playerWord] = updatedWord;
    let newPuzzle = wordsToCopy.join(" ");
    // update game state to return and set everything we need
    stateToReturn = {
        oldPuzzle: puzzle,
        newPuzzle: newPuzzle,
        lastSubmitTime: Date.now,
        lastGuessCorrent: wasGuessCorrect,
    }
    // finally reset what we need and update the screen
    setKeyboardOutput("");
    setPuzzle(newPuzzle);
  }

  // gets the number of blank spaces in a given word.
  function getBlankCount(word) {
    let count = 0;
    // funny js typecasting hack -- int + bool = int + 1 (if true) or 0 (if false)
    for(let i = 0; i < word.length; i++) count+=(word[i]==="*");
    return count;
  }

  return (
    <View style={styles.container}>
      <PuzzleView text={keyboardOutput} puzzle={puzzle} playerWord={playerWord} otherWord={otherWord} input={keyboardOutput}/>
      <Keyboard output = {keyboardOutput} onSubmit={handleSubmit} setOutput={setKeyboardOutput} maxOutputLength={maxKeyboardOutputLength}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
