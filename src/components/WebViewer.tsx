import React, { ReactNode, useLayoutEffect } from 'react';
import { useCallback, useEffect, useState, useRef } from 'react';
import { BackHandler, NativeEventSubscription, Platform, Pressable } from 'react-native';
import { Text, View, StyleSheet } from 'react-native';
import TextButton from 'components/common/TextButton';
import WebView from 'react-native-webview';

export default function WebViewer({url, navigation}: {url: string, navigation}): ReactNode {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TextButton onPress={() => navigation.goBack()} text={"Done"} buttonStyle={{marginRight: 16}}/>
            ),
        });
    }, [navigation]);

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
}

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
        <TextButton text="Back" onPress = {() => webNavigationRef.current?.goBack()}/>
    ): null;
    const refreshButton: ReactNode = (
        <TextButton text="Reload" onPress = {() => webNavigationRef.current?.reload()}/>
    );
    const forwardButton: ReactNode = canGoForward ? (
        <TextButton text="Forward" onPress = {() => webNavigationRef.current?.goForward()}/>
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
});