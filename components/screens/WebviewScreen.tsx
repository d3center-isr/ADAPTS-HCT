import React from 'react';
import { useCallback, useEffect, useState, useRef } from 'react';
import { BackHandler, NativeEventSubscription, Platform } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

type WebviewScreenProps = {
    route: {
        params: {
            url: string;
        };
    };
};

const WebviewScreen: React.FC<WebviewScreenProps> = ({ route }) => {
    const { url } = route.params;
    /**
     * In-web navigation handling
     * we need to intercept the existing "back" gesture handling and replace it with 
     * code that navigates back on the webpage, if possible. 
    */
    // bool state -- true if we can navigate "back" to a previous webpage.
    // false if there is no page we can go back to. 
    const [canGoBack, setCanGoBack] = useState(false);
    // By assigning the ref of the web viewer to this, we can control when to remember web navigation history...
    // TODO: make sure this clears on initial page load.
    const webViewRef = useRef(null);
    
    // Below code is to handle gesture navigation on Android
    // for Android it requires quite a bit of code -- iOS is much simpler (just set 1 prop to true...)
    const onAndroidBackPress = useCallback(() => {
        console.log("Back Press intercepted!");
        if (canGoBack) {
            webViewRef.current?.goBack();
            return true; // prevent default behavior (exit app)
        }
        return false;
    }, [canGoBack]);
    // hook up the onAndroidBackPress to an actual event handler
    useEffect(() => {
        if (Platform.OS === 'android') {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
            return () => {
                backHandler.remove();
            };
        }
    }, [onAndroidBackPress]);


    return (
        <View style={styles.container}>
            <WebView 
                source={{ uri: url }} style={styles.webview}
                // the below prop enables back forward gestures for iOS only. 
                // we have to set up a special event listener for Android.
                allowsBackForwardNavigationGestures = {true}
                ref={webViewRef}
                onLoadProgress={event => {
                    setCanGoBack(event.nativeEvent.canGoBack);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
});

export default WebviewScreen;