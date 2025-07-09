import { ReactNode, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-web";
import MultipleChoiceWidget from "../MultipleChoiceWidget";
import { MultipleChoiceButtonData } from "../MultipleChoiceWidget";
import GenericPopup from "../GenericPopup";
import CountdownTimer from "../CountdownTimer";

type GameState = {
  name: string,
  puzzle: string,
  puzzleKey: string,
  playerWord: number,
  otherWord: number
}

/**
 * Creates a new instance of the GameState struct -- I need to make this into an actual type
 */
function NewGameState(newName: string, newPuzzle: string, newPuzzleKey: string, newPlayerWord: number, newOtherWord: number): GameState {
  return {
    name: newName,
    puzzle: newPuzzle,
    puzzleKey: newPuzzleKey,
    playerWord: newPlayerWord,
    otherWord: newOtherWord,
  };
}

const gameStates: GameState[] = [
  NewGameState("#1: Pastry puzzle: Part 1", "I **** to *** **n**k**", "I love to eat pancakes", 4, 1),
  NewGameState("#2: Pastry puzzle: Part 2", "I **** to *** pancakes", "I love to eat pancakes", 3, 1),
  NewGameState("#3: An old internet joke: Part 1", "All **** **** are ****** to us", "All your base are belong to us", 4, 1),
  NewGameState("#4: An old internet joke: Part 2", "All y*** **** are ****** to us", "All your base are belong to us", 2, 1),
]

// TODO: Add typedoc info on the type of "navigation" -- seriously what is it?
export default function TitleScreen({navigation}) {
  const [showTestPopup, setShowTestPopup] = useState(false);
  function loadGame(state: GameState): void {
    navigation.navigate('Game', state);
  }

  const infoText: string = `This is a demo of the game functionality of the medicine taking companion app.
  
  In this game, you must use the keyboard to guess the word highlighted in blue. You only have 1 guess per day.
  
  Press 'ENTER' to guess. A correct guess will reveal the word, and an incorrect one will reveal a single letter.
  
  Press one of the buttons below to enter a puzzle.
  `

  let content: ReactNode[] = [];
  for(let i = 0; i < gameStates.length; i++) {
    content[i] = (
      <Pressable key={i} style={styles.navigationButton} onPress={()=>loadGame(gameStates[i])}>
        <Text style={styles.navigationText}>{gameStates[i].name}</Text>
      </Pressable>
    );
  }


  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{infoText}</Text>
        {content}
        <MultipleChoiceDemo/>
        <View style={{flex: 0.1}}/>
        <Pressable style={styles.navigationButton} onPress={()=>setShowTestPopup(true)}>
          <Text style={styles.navigationText}>Debug: Press to show Med Log Popup</Text>
        </Pressable>
        <CountdownTimer countdownTarget={new Date(2025, 6, 3)} countdownReference={new Date(2024, 6, 2)}/>
        <CountdownTimer countdownTarget={new Date(2024, 6, 3)} countdownReference={new Date(2025, 6, 2)}/>
        <CountdownTimer countdownTarget={new Date(2025, 8, 2)} showTarget={true}/>
        <CountdownTimer countdownTarget={new Date(2026, 7, 31)}/>

        <Pressable style={styles.navigationButton} onPress={()=> navigation.navigate('CalendarDemo')}>
          <Text style={styles.navigationText}>Navigate to Calendar Test Screen</Text>
        </Pressable>

        <GenericPopup visible={showTestPopup} horizontalMargins={0.04}>
          <Text>Medication Reporting Widget</Text>
          <Pressable style={styles.navigationButton} onPress={()=>setShowTestPopup(false)}>
            <Text style={styles.navigationText}>Close Widget</Text>
          </Pressable>
        </GenericPopup>
      </View>
  );
}

/**
 * Example Demo of usage of a MultipleChoicePanel
 * Contains a set of 4 panels in a horizontal row. The "active" state corresponds to the index of 
 * the currently active panel (and -1 if none have been pressed)
 * Only for demonstration purposes.
 */
function MultipleChoiceDemo() {
  let buttonData: MultipleChoiceButtonData[] = [
    {
      textToDisplay: "Option 1",
      color: "#eee",
    },
    {
      textToDisplay: "Option 2",
      color: "#ddd",
    },
    {
      textToDisplay: "Option 3",
      color: "#ccc",
    },
    {
      textToDisplay: "Option 4",
      color: "#bbb",
    },
  ];
  console.log("Num options: " + buttonData.length);
  const [mcActive, setMCActive] = useState(-1);
  return <MultipleChoiceWidget buttonData={buttonData} activeButtonId={mcActive} setActiveButtonId={setMCActive}/>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'col',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navigationButton: {
        backgroundColor: "#3a4466",
        borderColor: "#262b44",
        borderRadius: 3,
        borderWidth:3,
        justifyContent:'center',
        margin:1,
        padding: 4,
    },
    navigationText: {
        color: '#dde',
    }
});
  