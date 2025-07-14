import { Text, Image, View, StyleSheet, FlatList, Linking } from "react-native";
import { ReactNode } from "react";
import { Message, Element, ElementType } from "./MessageListScreen";
import { useNavigation } from "@react-navigation/native";

export default function MessageViewScreen({navigation, route}) {
    

    console.log("passed in param length: " + route.params);
    //const message = route.message;
    return (
        <View>
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
                    source={{
                        uri: elt.value
                    }}
                />
            );
        case "link":
            return (
                <Text style={[styles.messageText, styles.linkText]}>
                    {elt.value}
                </Text>
            );
        default: 
            console.error("Unidentified ElementType: " + elt.type);
            return null;
    }
}

let styles = StyleSheet.create({
    messageText: {
        fontSize: 14
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
    }

});
