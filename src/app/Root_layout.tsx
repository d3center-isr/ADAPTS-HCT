import { ImageSourcePropType} from 'react-native';
import { useState, useEffect } from 'react';
// Expo Router Imports
import { Stack } from 'expo-router';

import { Image } from 'react-native';
import * as Notifications from 'expo-notifications';
// Function imports
import { sendPushNotification, registerForPushNotificationsAsync } from 'utils/NotificationHandler';
// component imports

import { NotificationTokenContext } from 'utils/NotificationHandler';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});


function MainStackNavigator() {
  return (
    <Stack id={undefined} initialRouteName='MainTabs'>
      <Stack.Screen 
        name="(tabs)"
      />
    </Stack>
  );
}



export default function RootLayout() {
  
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error: any) => setExpoPushToken(`${error}`));

    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("This bundle's Expo Push Token is: " + response);
    });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return (
    <NotificationTokenContext value = {expoPushToken}>
      <MainStackNavigator/>
    </NotificationTokenContext>
  );
}
