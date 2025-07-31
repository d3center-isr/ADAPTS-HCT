import React, { ReactNode, useLayoutEffect } from 'react';
import WebViewer from 'components/WebViewer';

type WebViewScreenProps = {
    url: string
};

/** 
 * A Viewer for web content. Contains a react native web viewer, as well as navigation buttons in a footer.
 * Can also capture "back" gestures as needed to navigate.
 * ( note that the user may deviate from this page by clicking on links within the url's content)
 * @param url {string}: the starting URL to display content from. 
 */
const WebViewScreen: React.FC<WebViewScreenProps> = ({url}: {url: string}) => {
   return <WebViewer url={url}/>
};
export default WebViewScreen;
