/**
 * A Screen which displays the contents of a single Message object.
 * Uses a FlatList which renders each Element of the message in a list entry. 
 */
import MessageViewer from "../MessageViewer";

/**
 * A screen designed to show the contents of a message JSON. 
 * @param message {Message} -- a JSON message object to display
 */
export default function MessageViewScreen({navigation, route}) {
    return (<MessageViewer navigation={navigation} message={route.params.message}/>)
}
    