import React from 'react';
import { View, StyleSheet } from 'react-native';
import Game from '../game_components/Game'; // Adjust the import path if needed
import { GameState, NewGameState } from '../game_components/Game';


const GameScreen = ({ navigation}) => {
    // This is a set of puzzles for testing purposes. 
    const gameStates: GameState[] = [
        NewGameState("#1: Pastry puzzle: Part 1", "I **** to *** **n**k**", "I love to eat pancakes", 4, 1),
        NewGameState("#2: Pastry puzzle: Part 2", "I **** to *** pancakes", "I love to eat pancakes", 3, 1),
        NewGameState("#3: An old internet joke: Part 1", "All **** **** are ****** to us", "All your base are belong to us", 4, 1),
        NewGameState("#4: An old internet joke: Part 2", "All y*** **** are ****** to us", "All your base are belong to us", 2, 1),
        NewGameState("Placeholder Game State", "This puzzle is g***ric", "This puzzle is generic", 3, 1),
    ]

    const state: GameState = gameStates[4]; // change the number here to pick which puzzle to use.
    console.log("AAAA" + state.puzzle);

    return (
        <View style={styles.container}>
            <Game gameState = {state}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default GameScreen;