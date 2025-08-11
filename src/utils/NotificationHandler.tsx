import { createContext } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useEffect } from 'react';
import { router } from 'expo-router';

export const NotificationTokenContext = createContext('');
/**
 * A debug function made to send a push notification.
 * @param expoPushToken {string} The expo token of the device to push to. 
 * @param title {string} The title text for the notification
 * @param body {string} The text to display in notification
 * 
 * For android, you may use HTML codes like \<b\>, \<i\> to add extra formatting. 
 * Also for android, you may use \<font color="#FF0000"\>\<font/\> tags to add COLOR to text!
 * 
 * (with this, we can make notifications just as colorful as those of the green owl...)
 */
export async function sendPushNotification(expoPushToken: string, title?: string, body?: string, imageURL?: string, link?: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: title ?? 'Default Title',
    body: body ?? '',
    richContent: {image: imageURL ?? ""},
    data: { url: link ?? ""},
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}
/**
 * Error logging function provided by Expo.
 */
function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

/**
 * Expo-provided custom "hook" to handle notifications.
 */
export function useNotificationObserver() {
  // triggers once on app load. 
  useEffect(() => {
    let isMounted = true;
    
    /**
     * Attempts to extract a URL from the provided function.
     * If one exists, and it meets the format for deep links, attempt to navigate to it.
     */
    function redirect(notification: Notifications.Notification) {
      const url: string = notification.request.content.data?.url;
      if (url) {
        if(url.startsWith("adaptshct")) router.push(url);
        else console.log("The provided url (" + url + ") does not meet the Deep Link format.")
      }
    }

    Notifications.getLastNotificationResponseAsync()
      .then(response => {
        if (!isMounted || !response?.notification) {
          return;
        }
        redirect(response?.notification);
      });

    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      redirect(response.notification);
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
}

/**  
 * This function was provided by Expo as part of a minimal working example on notifications. 
 * Checks for valid permissions, attempts to fetch the notification push token. 
 * @returns Promise for notification push token (Promise<string>)
*/
export async function registerForPushNotificationsAsync(): Promise<string> {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    // check to make sure that we have notification sending permissions
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    // get project ID
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    // attempt to get expo push token -- this is unique to both device and projectID.
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log("This session's Push Token is: " + pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}