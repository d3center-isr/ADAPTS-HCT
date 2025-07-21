import { Text, View, StyleSheet, FlatList, Linking, Pressable} from "react-native";
// TODO: replace image usage here with expo-image Image class (it has support for more types)
import { Image } from "expo-image";
import { ReactNode } from "react";
import {Element} from "../../types/message.type";

export default function MessageViewScreen({route}) {
    return (
        <View style={{margin: 10}}>
            <FlatList data={route.params.message.elementList} renderItem={({item}) => {
                return (<MessageElement elt={item}/>);
            }}/>
        </View>
    );
}
    
function MessageElement({elt}: {elt: Element}): ReactNode {
    switch(elt.type) {
        case "text":
            return (<Text style={styles.messageText}>{elt.value}</Text>);
        case "image":
            return (
                <Image
                    style={styles.image}
                    source={elt.value}
                />
            );
        case "link":
            return (
                <Pressable onPress={()=>Linking.openURL(elt.value)}>
                    <Text style={[styles.messageText, styles.linkText]}>
                        {elt.value}
                    </Text>
                </Pressable>
            );
        default: 
            console.error("Unidentified ElementType: " + elt.type);
            return null;
    }
}

const styles = StyleSheet.create({
    messageText: {
        fontSize: 14
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    image: {
        width: 300,
        height: 300,
    }

});
