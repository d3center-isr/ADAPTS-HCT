import WebViewer from "components/WebViewer";
import { useLocalSearchParams } from "expo-router";


export default function WebViewerPage() {
    const {url} = useLocalSearchParams();

    return (
        <WebViewer url={url.toString()}/>
    );
}