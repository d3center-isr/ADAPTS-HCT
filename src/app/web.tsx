import { useLocalSearchParams } from "expo-router";
import WebviewScreen from "screens/WebViewScreen";


export default function WebViewerPage() {
    const {url} = useLocalSearchParams();

    return (
        <WebviewScreen url={url.toString()}/>
    );
}