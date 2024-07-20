import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { createContext } from 'react';
// React Navigation Imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
  
// component imports
import Game from './components/Game';
import TitleScreen from './components/TitleScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Title'>
        <Stack.Screen 
          name="Game" 
          component={Game} 
          options={{title: "Today's Puzzle"}}
        />
        <Stack.Screen 
          name="Title" 
          component={TitleScreen} 
          options={{title: "Title Screen"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'col',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
