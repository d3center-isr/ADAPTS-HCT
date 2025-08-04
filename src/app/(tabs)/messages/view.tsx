/**
 * A Screen which displays the contents of a single Message object.
 * Uses a FlatList which renders each Element of the message in a list entry. 
 */
import MessageViewer from "components/MessageViewer";
import { useLocalSearchParams } from "expo-router";
import { messageData } from "types/message.type";

/**
 * A screen designed to show the contents of a message JSON. 
 * @param name {Message} -- Provided through deep link URL. the name of the message object to display
 */
export default function MessageViewScreen() {
    const messageName: string = useLocalSearchParams().messageName.toString();
    return (<MessageViewer message={messageData.find((m)=> m.name == messageName)}/>);
}