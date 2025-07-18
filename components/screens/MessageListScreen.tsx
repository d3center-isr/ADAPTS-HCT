import { useNavigation } from '@react-navigation/native';
import messagesJSON from '../../assets/placeholders/debug-message-data.json'
import { FlatList, Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native';
import { Message, Element, ElementType, ELEMENT_TYPES } from '../../types/message.type';
import moment from 'moment';
// configs:
const MAX_PREVIEW_CHARS = 40;
const USE_12_HOUR_TIME = true;
const SORT_MESSAGES_BY_TIME = true;


// debug tool -- takes in the debug messages JSON and converts them to the Message format
const messageData = messagesJSON as Message[];

export default function MessageListScreen() {
    const navigation = useNavigation();
    if(SORT_MESSAGES_BY_TIME) messageData.sort(
        // sort dates in DESCENDING order (b-a instead of a-b). 
        (a,b) => {return new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()}
    );
    return (
        <FlatList data={messageData} renderItem={({item}) => {
            return <MessageListItem message={item} navigation={navigation}/>
        }}/>
    );
}

/**
 * Extracts the earliest instance of each type of Element in a message, and stores the index of each
 * in a Map (which is returned). Index the map using an ELEMENT_TYPE value to get the index of the earliest 
 * element of that type in a message. If no such Element type exists in the message, then the map contains -1.
 */
function getFirstInstanceOfTypes(message: Message): Map<string, number> {
    let toReturn: Map<string, number> = new Map();
    ELEMENT_TYPES.forEach((e) => {toReturn.set(e,-1)});
    message.elementList.forEach((e,i)=> {
        // check to see if there is an invalid element type referenced in the message.
        // since [] creates an entry if one does not exist, we have to do this before calling it.
        if(!toReturn.has(e.type)) {
            console.error("Undefined Element type (" + e.type + ") found in elt " + i + " in message " + message.name);
        }
        // if the currently examined element (e) is the first of its type in the message, log it as such. 
        if(toReturn.get(e.type) == -1) toReturn.set(e.type, i);
    });
    return toReturn;
}

/**
 * Tile list item containing a "preview" of the given message
 * @param message: {Message} - the message to preview
 */
function MessageListItem({message, navigation}) {
    let content: string = "Empty Message";
    // we need to determine what to put in the preview text.
    // first, get a way to access the first instance of each element type in the message.
    const firstInstances = getFirstInstanceOfTypes(message);
    // now we can check to see if each element type exists, where it is in the elementsList, and set the
    // preview accordingly. 
    // Our process is as follows:
    //  - We prioritize Text, then Image, then Link. if both Image and Link exist, we show both.
    if(firstInstances.get("text") != -1) {
        // extract the text content from the first Text element in the message, and display first 'n' characters.
        content = message.elementList[firstInstances.get("text")].value;
        if(content.length > MAX_PREVIEW_CHARS || message.elementList.length > 1) {
            content = content.substring(0, MAX_PREVIEW_CHARS) + "...";
        }
    }
    else if(firstInstances.get("image") != -1) {
        content = "contains an Image";
        if(firstInstances.get("link") != -1) content += " and a hyperlink";
    }
    else content = firstInstances.get("link") != -1 ? "contains a hyperlink" : "empty message";

    return (
        <View style={styles.messageTile}>
            <Pressable onPressOut={()=>{navigation.navigate('MessageView', {message: message})}}>
                {/* Debug Information */}
                <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.metaText, {flex: 0.4}]}>{message.name}</Text>
                    <Text style={[styles.metaText, {flex: 0.6, textAlign: 'right'}]}>
                        { "Recieved at " + moment(message.receivedAt).format('hh:mma, MMM DD')}
                    </Text>
                </View>
                {/* Actual content */}
                <Text>{content}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    messageTile: {
        backgroundColor: "#eee",
        margin: 3,
        padding: 4,
        borderWidth: 2,
        borderColor: '#666'
    },
    metaText: {
        fontSize: 11,
        fontStyle: 'italic'
    },
    messageText: {
        fontSize: 14,
    }
}); 