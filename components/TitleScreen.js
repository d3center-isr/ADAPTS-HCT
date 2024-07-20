import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-web";

export default function TitleScreen({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home Screen</Text>
          <Pressable style={styles.navigationButton} onPress={() => navigation.navigate('Game')}>
            <Text style={styles.navigationText}>Go to Game</Text>
          </Pressable>
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
  