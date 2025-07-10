import messagesJSON from '../../assets/placeholders/debug-message-data.json'
import { FlatList, Text, View } from 'react-native'
import { StyleSheet } from 'react-native';

// configs:
const MAX_PREVIEW_CHARS = 40;

/* --- Element – discriminated union -------------------------- */
const ELEMENT_TYPES = ["text", "image", "link"];
export type ElementType = typeof ELEMENT_TYPES[number];

/* --- An ISO-8601 date encoded as a string ------------------- */
export type ISODateString = string;                // e.g. "2023-12-31T23:59:59Z"

/* --- Message ------------------------------------------------ */
export interface Message {
  name: string;
  /** A list of elements to be displayed */
  elementList: Element[];
  /** ISO-8601 date string -- can be fed into the Date constructor for direct coversion*/
  receivedAt: ISODateString | "Unknown";
}

export interface Element {
    type: ElementType,
    value: string,
}

const messageData = messagesJSON as Message[];

export default function MessageListScreen() {
    return (
        <FlatList data={messageData} renderItem={({item}) => {
            return <MessageListItem message={item}/>
        }}/>
    );
}

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

function MessageListItem({message}: {message: Message}) {
    let content: string = "Empty Message";
    let firstInstances = getFirstInstanceOfTypes(message);
    console.log(firstInstances.get("text") + " " + message.elementList.length);
    if(firstInstances.get("text") != -1) {
        // extract the text content from the first Text element in the message, and display first 'n' characters.
        content = message.elementList[firstInstances.get("text")].value;
        if(content.length > MAX_PREVIEW_CHARS) content = content.substring(0, MAX_PREVIEW_CHARS) + "...";
    }
    else if(firstInstances.get("image") != -1) {
        content = "Image";
        if(firstInstances.get("link") != -1) content += " and hyperlink";
    }
    else content = firstInstances.get("link") != -1 ? "hyperlink" : "empty message";
    
    if(message.elementList.length > 1) content += " (>1 elts)";

    return (
        <View style={styles.messageTile}>
            {/* Debug Information */}
            <View style={{flexDirection: 'row'}}>
                <Text style={[styles.metaText, {flex: 0.5}]}>{message.name}</Text>
                <Text style={[styles.metaText, {flex: 0.5, textAlign: 'right'}]}>
                    { "recieved on: " + 
                        (message.receivedAt == "Unknown" ? "Unknown": new Date(message.receivedAt).toDateString())
                    }
                </Text>
            </View>
            {/* Actual content */}
            <Text>{content}</Text>
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