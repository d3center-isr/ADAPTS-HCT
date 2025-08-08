// THIS IS THE ROOT LAYOUT FILE!

import { useState, useEffect } from 'react';
// Expo Router Imports
import { Stack } from 'expo-router';
import * as Notifications from 'expo-notifications';
// Function imports
import { sendPushNotification, registerForPushNotificationsAsync, useNotificationObserver } from 'utils/NotificationHandler';
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

export default function RootLayout() {
  
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );

  useNotificationObserver()

  useEffect(() => {
    console.log("trying to register for push notifs...");
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
      <Stack screenOptions={{headerShown: false}}>
      </Stack>
    </NotificationTokenContext>
  );
}
