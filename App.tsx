import { StyleSheet, Text, View } from 'react-native';
// React Navigation Imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
// component imports
import GameScreen from './components/screens/GameScreen';
import TitleScreen from './components/screens/TitleScreen';
import HomeScreen from './components/screens/HomeScreen';

type RootStackParamList = {
  Title: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();

const ROUTE_NAMES = {
  Home: "Home",
  Messages: "Messages",
  Insights: "Insights",
  Game: "Game",
  Debug: "Debug"
}

const iconMap: Record<string, any> = {
  home: require("./assets/navigation-tab-icons/menu-icon-home.png"),
  messages: require("./assets/navigation-tab-icons/menu-icon-messages.png"),
  insights: require("./assets/navigation-tab-icons/menu-icon-insights.png"),
  game: require("./assets/navigation-tab-icons/menu-icon-game.png"),
  debug: require("./assets/navigation-tab-icons/menu-icon-debug.png"),
  error: require("./assets/navigation-tab-icons/menu-icon-error.png"),
};

const TAB_ICON_ACTIVE_TINT_COLOR = 'blue';
const TAB_ICON_INACTIVE_TINT_COLOR = 'black';

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;
          switch(route.name) {
            case ROUTE_NAMES.Home:
              iconName = "home";
              break;
            case ROUTE_NAMES.Messages:
              iconName = "messages";
              break;
            case ROUTE_NAMES.Insights:
              iconName = "insights";
              break;
            case ROUTE_NAMES.Game:
              iconName = "game";
              break;
            case ROUTE_NAMES.Debug:
              iconName = "debug";
              break;
            default:
              iconName = "error";
              break;
          }

          // You can return any component that you like here!
          return <Image 
            style={[styles.image, {tintColor: (focused ? TAB_ICON_ACTIVE_TINT_COLOR: TAB_ICON_INACTIVE_TINT_COLOR)}]} 
            source={iconMap[iconName]} 
          />;
        },
        tabBarActiveTintColor: TAB_ICON_ACTIVE_TINT_COLOR,
        tabBarInactiveTintColor: TAB_ICON_INACTIVE_TINT_COLOR,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Game" component={GameScreen} />
      <Tab.Screen name="Debug" component={TitleScreen} />
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
  },
  image: {
    width: 30,
    height: 30,
  }
});
