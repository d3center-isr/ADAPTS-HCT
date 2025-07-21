import { createContext } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';


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
export async function sendPushNotification(expoPushToken: string, title?: string, body?: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: title ?? 'Default Title',
    body: body ?? '',
    data: { someData: 'goes here' },
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

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
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
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}