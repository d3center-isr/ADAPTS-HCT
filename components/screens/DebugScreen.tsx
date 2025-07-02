import { ReactNode, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-web";
import GenericPopup from "../GenericPopup";


// TODO: Add typedoc info on the type of "navigation" -- seriously what is it?
export default function DebugScreen({navigation}) {
  const [showTestPopup, setShowTestPopup] = useState(false);
  // function loadGame(state: GameState): void {
  //   navigation.navigate('Game', state);
  // }

  const infoText: string = `Welcome to the Debug Screen!`

  // let content: ReactNode[] = [];
  // for(let i = 0; i < gameStates.length; i++) {
  //   content[i] = (
  //     <Pressable key={i} style={styles.navigationButton} onPress={()=>loadGame(gameStates[i])}>
  //       <Text style={styles.navigationText}>{gameStates[i].name}</Text>
  //     </Pressable>
  //   );
  // }
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{infoText}</Text>
        {/* {content} */}
        <View style={{flex: 0.1}}/>
        <Pressable style={styles.navigationButton} onPress={()=>setShowTestPopup(true)}>
          <Text style={styles.navigationText}>Debug: Press to show Med Log Popup</Text>
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
  