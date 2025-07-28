import React, { ReactNode, useLayoutEffect } from 'react';
import { useCallback, useEffect, useState, useRef } from 'react';
import { BackHandler, NativeEventSubscription, Platform, Pressable } from 'react-native';
import { Text, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

type WebviewScreenProps = {
    navigation: any, // TODO: make this a navigation type
    route: {
        params: {
            url: string;
        };
    };
};

/** 
 * A Viewer for web content. Contains a react native web viewer, as well as navigation buttons in a footer.
 * Can also capture "back" gestures as needed to navigate.
 * ( note that the user may deviate from this page by clicking on links within the url's content)
 * @param url {string}: the starting URL to display content from. 
 */
const WebviewScreen: React.FC<WebviewScreenProps> = ({ navigation, route }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
        headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()} style={[styles.navigationButton, {marginRight: 16}]}>
            <Text style={styles.navigationText}>Done</Text>
            </Pressable>
        ),
        });
    }, [navigation]);

    const { url } = route.params;
    /**
     * In-web navigation handling
     * we need to intercept the existing "back" gesture handling and replace it with 
     * code that navigates back on the webpage, if possible. 
    */
    // bool state -- true if we can navigate "back" to a previous webpage.
    // false if there is no page we can go back to. 
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);
    // By assigning the ref of the web viewer to this, we can control when to remember web navigation history...
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
                // the below prop enables back forward web navigation for iOS only. 
                // we have to set up a special event listener for Android.
                allowsBackForwardNavigationGestures = {true}
                ref={webViewRef}
                onNavigationStateChange={navState => {
                    setCanGoBack(navState.canGoBack);
                    setCanGoForward(navState.canGoForward);
                }}
            />
            <WebNavigationFooter canGoBack={canGoBack} canGoForward={canGoForward} webNavigationRef={webViewRef}/>
        </View>
    );
};
export default WebviewScreen;

/**
 * footer for webviews that contains buttons to go back or forward in history, or refresh page. 
 * Depending on canGoForward or canGoBack the back button or forward button will not be shown
 * @param webNavigationRef: a useRef corresponding to a web navigator
 * @param canGoForward: A boolean indicating that there is a page "forward" in the history we can go to.
 * @param can GoBack: A boolean indicating that there is a page "backward" in the history that we can go to.
 */
function WebNavigationFooter({webNavigationRef, canGoForward, canGoBack}: 
    {webNavigationRef: React.RefObject<any>, canGoForward: boolean, canGoBack: boolean}): ReactNode {
    // My soul hurts with this code duplication. Definitely need to create a common button with text class
    // that can be called from places -- this is getting annoying. 
    const backButton: ReactNode = canGoBack ? (
        <Pressable style={styles.navigationButton} onPress={() => webNavigationRef.current?.goBack()}>
            <Text style={styles.navigationText}>Back</Text>
        </Pressable>
    ): null;
    const refreshButton: ReactNode = (
        <Pressable style={styles.navigationButton} onPress={() => webNavigationRef.current?.reload()}>
            <Text style={styles.navigationText}>Refresh</Text>
        </Pressable>
    );
    const forwardButton: ReactNode = canGoForward ? (
        <Pressable style={styles.navigationButton} onPress={() => webNavigationRef.current?.goForward()}>
            <Text style={styles.navigationText}>Forward</Text>
        </Pressable>
    ): null;
    return (
        <View style={styles.footer}>
            {backButton}
            {refreshButton}
            {forwardButton}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1
    },
    footer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    navigationButton: {
        backgroundColor: "#3a4466",
        borderColor: "#262b44",
        borderRadius: 3,
        borderWidth:3,
        justifyContent:'center',
        margin:5,
        padding: 4,
    },
    navigationText: {
        color: '#dde',
    }
});