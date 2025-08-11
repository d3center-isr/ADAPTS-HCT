/**
 * Renders all aspects of the Game users play.
 * Handles Keyboard Input processing, guess handling, game state updates, as well as rendering game components.
 */

import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { useCallback } from 'react';
// component imports
import Keyboard from './Keyboard';
import PuzzleView from './PuzzleView';
import GuessWarningPopup from './GuessWarningPopup';
import { useFocusEffect } from 'expo-router';

/**
 * State of a game session.
 */
export type GameState = {
  /** The name of the puzzle. Used purely for reference by Debug Menus. */
  name: string;
  /** Puzzle string to be solved, contains '*'s denoting unsolved characters. */
  puzzle: string;
  /** Answer key for the puzzle without any * characters. */
  puzzleKey: string;
  /** Index of this player's active word. */
  playerWord: number;
  /** Index of the other player's active word. */
  otherWord: number;
};

/**
 * Creates a new GameState object with the provided values.
 *
 * @param newName - The name of the puzzle. Used purely for reference by Debug Menus.
 * @param newPuzzle - Puzzle string to be solved, contains '*'s denoting unsolved characters.
 * @param newPuzzleKey - Answer key for the puzzle without any * characters.
 * @param newPlayerWord - The index of the word currently being solved by the player.
 * @param newOtherWord - Index of the other player's active word.
 * @returns A fully constructed GameState.
 */
export function NewGameState(newName: string, newPuzzle: string, newPuzzleKey: string, newPlayerWord: number, newOtherWord: number): GameState {
  return {
    name: newName,
    puzzle: newPuzzle,
    puzzleKey: newPuzzleKey,
    playerWord: newPlayerWord,
    otherWord: newOtherWord,
  };
}

/**
 * Renders all aspects of the Game users play.
 * Handles Keyboard Input processing, guess handling, game state updates, as well as rendering game components.
 */
export default function Game({gameState}: {gameState: GameState}) {
  
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
  useFocusEffect(
    useCallback(() => {
      let initialized = false;
      if (!initialized) {
        setPuzzle(gameState.puzzle);
        setPuzzleKey(gameState.puzzleKey);
        setPlayerWord(gameState.playerWord);
        setOtherWord(gameState.otherWord);
        initialized = true;
      }
    }, [gameState])
  );
  
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
    // iterate over the submission for the player word -- if the player's input conflicts with the given answer, show a warning popup.
    for(let i = 0; i < puzzle.split(" ")[playerWord].length; i++) {
      // console.log(puzzle.split(" ")[playerWord][i]);
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
    
    const assignedWord = puzzle.split(" ")[playerWord];
    const toCheck = keyboardOutput;
    const answer = puzzleKey.split(" ")[playerWord];
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
        let blankSpaces: number[] = [];
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
    const wordsToCopy = puzzle.split(" ");
    wordsToCopy[playerWord] = updatedWord;
    const newPuzzle = wordsToCopy.join(" ");
    // update game state to return and set everything we need
    // This object is for when we integrate the backend -- it is unused for now.
    const stateToReturn = {
        oldPuzzle: puzzle,
        newPuzzle: newPuzzle,
        lastSubmitTime: Date.now,
        lastGuessCorrent: wasGuessCorrect,
    }
    // finally reset what we need and update the screen
    
    setPuzzle(newPuzzle);
    setKeyboardOutput("");
    
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
      <PuzzleView puzzle={puzzle} playerWord={playerWord} otherWord={otherWord} input={keyboardOutput}/>
      <Keyboard output = {keyboardOutput} onSubmit={handleSubmit} setOutput={setKeyboardOutput} maxOutputLength={maxKeyboardOutputLength}/>
      <View style={{flex: 0.05}}></View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  paddingContainer: {
    flex: 1, 
    flexDirection: 'row',
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
