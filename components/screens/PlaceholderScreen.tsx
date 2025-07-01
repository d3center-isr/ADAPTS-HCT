import { StyleSheet } from "react-native"
import { Text, View, Image } from "react-native"



export default function PlaceholderScreen() {
    return (
        <View>
            <Text>This is a placeholder screen!</Text>
            <Image style={{width: 200, height: 200}}source={require("../../assets/placeholder-penguins.png")}/>
            <Text>Have some Placeholder Penguins.</Text>
        </View>
    );
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    justifyContent: 'center'
  }
});