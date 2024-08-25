import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';

// component imports
import Keyboard from './Keyboard';
import PuzzleView from './PuzzleView';
import { WordState } from './Word';
import Popup from './GuessWarningPopup';
import GuessWarningPopup from './GuessWarningPopup';



export default function Game({route, navigation}) {
  
  // constants for keyboard input.
  // - digital keyboard output is stored in the keyboardOutput variable. It is a state modified by the keyboard, 
  // and should not be modified in this program except to clear its contents.
  // - maxKeyboardOutPutLength is the length limit for the keyboardOutput. 
  const [keyboardOutput, setKeyboardOutput] = useState("");
  // this is the answer key
  const [puzzleKey,setPuzzleKey] = useState("");
  const [puzzle, setPuzzle] = useState("");
  const [playerWord, setPlayerWord] = useState(0);
  const [otherWord, setOtherWord] = useState(0);

  // popup management
  const [wordWarningPopupVisible, setWordWarningPopupVisible] = useState(false);
  // This is where we are loading the initial gamestate. 
  // When connecting the front end to the back end game logic, this is 
  // where the game state parameters should be loaded.
  useEffect(() => {
    const gameState =  route.params;
    setPuzzle(gameState.puzzle);
    setPuzzleKey(gameState.puzzleKey);
    setPlayerWord(gameState.playerWord);
    setOtherWord(gameState.otherWord);
  }, []);
  
  const maxKeyboardOutputLength = puzzle.split(" ")[playerWord].length;

  /** 
   * Handles the logic for processing a submitted answer.
   * If input does not match given hints, does not process answer and instead brings up warning popup.
   * @note This function is only called when the keyboard input is "full".
  */
  function handleSubmit() {
    // we only want to submit our answer when the input field is completely filled up.
    // Also, if the input field is larger than it should be for some reason it would be nice
    // to catch that.
    if(keyboardOutput.length != maxKeyboardOutputLength) {
      setWordWarningPopupVisible(true);
      console.log("input either too long or too small -- showing warning popup");
      return;
    }
    console.log("submitting...");

    console.log(puzzle.split(" ")[playerWord] + " " + keyboardOutput);

    for(let i = 0; i < puzzle.split(" ")[playerWord].length; i++) {
      console.log(puzzle.split(" ")[playerWord][i]);
      if(puzzle.split(" ")[playerWord][i] != "*" &&
      puzzle.split(" ")[playerWord][i].toLowerCase() != keyboardOutput[i].toLowerCase()) {
        setWordWarningPopupVisible(true);
        console.log("hint does not match input -- showing warning popup");
        return;
      }
    }
    CheckGuessAndUpdatePuzzle();
  }

  function CheckGuessAndUpdatePuzzle() {
    
    let assignedWord = puzzle.split(" ")[playerWord];
    let toCheck = keyboardOutput;
    let answer = puzzleKey.split(" ")[playerWord];
    let updatedWord;
    let wasGuessCorrect;
    // correct guess handling
    if(toCheck.length === answer.length && toCheck.toLowerCase() == answer.toLowerCase()) {
      console.log("Correctly guessed word!");
      wasGuessCorrect = true;
      updatedWord = puzzleKey.split(" ")[playerWord];
    }
    // Incorrect guess handling
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
    
    setPuzzle(newPuzzle);
    setKeyboardOutput("");
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
      <GuessWarningPopup visible={wordWarningPopupVisible} hintData={puzzle.split(" ")[playerWord]} input={keyboardOutput}
        onYesPress={()=>{
          setWordWarningPopupVisible(false);
          console.log("Yes pressed");
          CheckGuessAndUpdatePuzzle();
        }}
        onNoPress={()=>{
          console.log("No pressed");
          setWordWarningPopupVisible(false);
        }}
      />
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
  
  popupButton: {
    borderRadius: 10,
    padding: 5,
    margin: 10,
    marginBottom: 0,
}
});
