import { Text, View, StyleSheet, FlatList, Linking, Pressable} from "react-native";
// TODO: replace image usage here with expo-image Image class (it has support for more types)
import { Image } from "expo-image";
import { ReactNode } from "react";
import { Message, Element, ElementType, ELEMENT_TYPES } from "../../types/message.type";

/**
 * A screen designed to show the contents of a message JSON. 
 * @param message {Message} -- a JSON message object to display
 */
export default function MessageViewScreen({navigation, route}) {
    return (
        <View style={{margin: 10}}>
            <FlatList data={route.params.message.elementList} renderItem={({item}) => {
                return (<MessageElement elt={item} navigation={navigation}/>);
            }}/>
        </View>
    );
}
    
/**
 * The displayed content of a single elemnet of a message. Can either be text, a link, or an image.
 * @param elt {Element} the element whose content to display
 * @param navigation -- Unknown type, this is a navigator we call in order to show links in a webview
 */
function MessageElement({elt, navigation}: {elt: Element, navigation: any}): ReactNode {
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
                <Pressable onPress={()=>navigation.navigate('WebView', {url: elt.value})}>
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
