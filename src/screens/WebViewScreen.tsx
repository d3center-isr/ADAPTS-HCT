import React, { ReactNode, useLayoutEffect } from 'react';
import WebViewer from '../components/WebViewer';

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
   return <WebViewer navigation = {navigation} url={route.params.url}/>
};
export default WebviewScreen;
