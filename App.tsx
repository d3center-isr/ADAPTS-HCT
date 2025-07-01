import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
// React Navigation Imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
// component imports
import GameScreen from './components/screens/GameScreen';
import TitleScreen from './components/screens/DebugScreen';
import HomeScreen from './components/screens/HomeScreen';

const Tab = createBottomTabNavigator();

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
      return require("./assets/navigation-tab-icons/menu-icon-home.png");
    case ROUTE_NAMES.Messages:
      return require("./assets/navigation-tab-icons/menu-icon-messages.png");
    case ROUTE_NAMES.Insights:
      return require("./assets/navigation-tab-icons/menu-icon-insights.png");
    case ROUTE_NAMES.Game:
      return require("./assets/navigation-tab-icons/menu-icon-game.png");
    case ROUTE_NAMES.Debug:
      return require("./assets/navigation-tab-icons/menu-icon-debug.png");
    default:
      return require("./assets/navigation-tab-icons/menu-icon-error.png");
  }
};

/**
 * Tab Navigator structure. Creates the "bottom tabs" system at the bottom of the screen.
 * Used to navigate between the "main tabs"
 */
function MyTabs() {
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
      <Tab.Screen name={ROUTE_NAMES.Messages} component={HomeScreen} />
      <Tab.Screen name={ROUTE_NAMES.Insights} component={HomeScreen} />
      <Tab.Screen name={ROUTE_NAMES.Game} component={GameScreen} />
      <Tab.Screen name={ROUTE_NAMES.Debug} component={TitleScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
