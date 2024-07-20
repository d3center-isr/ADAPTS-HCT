import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
  
// component imports
import Keyboard from './Keyboard';
import PuzzleView from './PuzzleView';

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
      console.log("Invalid submission attempt -- input either too long or too small.")
    }
    console.log("submitting...");
    let toCheck = getSplicedWord(puzzle.split(" ")[playerWord], keyboardOutput);
    let answer = puzzleKey.split(" ")[playerWord];
    // let's make sure we're not being case sensitive when checking answers...
    if(toCheck.toLowerCase() == answer.toLowerCase()) {
      console.log("Correctly guessed word!");
      // now we need to update puzzle. Since we are not modifying strings, we will 
      // split puzzle and copy the words into a new string. When copying over the word we guessed, 
      // we will instead copy over the word from the answer key.
      let wordsToCopy = puzzle.split(" ");
      let newPuzzle = "";
      for(let i = 0; i < wordsToCopy.length; i++) {
        let toCopy = i===playerWord ? answer: wordsToCopy[i];
        // only add a space at the end if this is not the final word.
        // if we did not do this string.split() would contain an extra empty string.
        if(i < wordsToCopy.length - 1) toCopy += " ";
        newPuzzle += toCopy;
      }
      setPuzzle(newPuzzle);
    }
    else console.log(toCheck.toLowerCase() + " != " + answer);
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
