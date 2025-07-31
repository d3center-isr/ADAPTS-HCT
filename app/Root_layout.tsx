import { ImageSourcePropType} from 'react-native';
import { useState, useEffect } from 'react';
// React Navigation Imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import * as Notifications from 'expo-notifications';
// Function imports
import { sendPushNotification, registerForPushNotificationsAsync } from '../src/utils/NotificationHandler';
// component imports
// TODO: Find a way to simplify this -- this is a lot of seperate line imports
import HomeScreen from '../src/screens/HomeScreen';
import GameScreen from '../src/screens/GameScreen';
import MessageListScreen from '../src/screens/MessageListScreen';
import MessageViewScreen from '../src/screens/MessageViewScreen';
import DebugScreen from '../src/screens/DebugScreen';
import PlaceholderScreen from '../src/screens/PlaceholderScreen';
import CalendarTestScreen from '../src/screens/CalendarTestScreen';
import WebviewScreen from '../src/screens/WebViewScreen';

import { NotificationTokenContext } from '../src/utils/NotificationHandler';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
/**
 * A list of all possible route names. When using a route name in this file, 
 * refer to the variables in this object, NOT the raw string.
 * When adding new screens, add their route names to this object. 
 * 
 * The point of this structure is to act as a shorthand and avoid instances in which we refer to a 
 * route as one thing in one place and another thing in a different place.
 */
const ROUTE_NAMES = {
  Home: "Home",
  Messages: "Messages",
  Insights: "Insights",
  Game: "Game",
  Debug: "Debug"
}

/**
 * A map between route name and the navigation icon used to represent that route. 
 * @param {routeName}: the name of the Route you want to get the icon of. 
 * 
 * In the case that the provided routeName does not match any of the existing icons, 
 * the error icon ./assets/navigation-tab-icons/menu-icon-error.png will be used.
 */
const getIcon = (routeName: string): ImageSourcePropType => {
  switch (routeName) {
    case ROUTE_NAMES.Home:
      return require("../assets/navigation-tab-icons/menu-icon-home.png");
    case ROUTE_NAMES.Messages:
      return require("../assets/navigation-tab-icons/menu-icon-messages.png");
    case ROUTE_NAMES.Insights:
      return require("../assets/navigation-tab-icons/menu-icon-insights.png");
    case ROUTE_NAMES.Game:
      return require("../assets/navigation-tab-icons/menu-icon-game.png");
    case ROUTE_NAMES.Debug:
      return require("../assets/navigation-tab-icons/menu-icon-debug.png");
    default:
      return require("../assets/navigation-tab-icons/menu-icon-error.png");
  }
}

function MainStackNavigator() {
  return (
    <Stack.Navigator id={undefined} initialRouteName='MainTabs'>
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabNavigator} 
      />
      <Stack.Screen 
        name="MessageView" 
        component={MessageViewScreen} 
      />
      <Stack.Screen 
        name="CalendarDemo" 
        component={CalendarTestScreen} 
      />
      <Stack.Screen 
        name="WebView" 
        component={WebviewScreen} 
      />
    </Stack.Navigator>
  );
}

/**
 * Tab Navigator structure. Creates the "bottom tabs" system at the bottom of the screen.
 * Used to navigate between the "main tabs"
 */
function MainTabNavigator() {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={({ route }) => ({
        tabBarIcon: ({color, size}) => {
          return <Image 
            style={{tintColor: color, width: size, height: size}} 
            source={getIcon(route.name)} 
          />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'black',
      })}
    >
      <Tab.Screen name={ROUTE_NAMES.Home} component={HomeScreen} />
      <Tab.Screen name={ROUTE_NAMES.Messages} component={MessageListScreen} />
      <Tab.Screen name={ROUTE_NAMES.Insights} component={PlaceholderScreen} />
      <Tab.Screen name={ROUTE_NAMES.Game} component={GameScreen} />
      <Tab.Screen name={ROUTE_NAMES.Debug} component={DebugScreen} />
    </Tab.Navigator>
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
      <NavigationContainer>
        <MainStackNavigator/>
      </NavigationContainer>
    </NotificationTokenContext>
  );
}
