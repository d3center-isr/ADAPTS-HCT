import { Tabs } from 'expo-router'
import { ImageSourcePropType } from 'react-native';
import { Image } from 'react-native';
import { capitalize } from 'utils/CapitalizeString';

/**
 * A list of all possible route names. When using a route name in this file, 
 * refer to the variables in this object, NOT the raw string.
 * When adding new screens, add their route names to this object. 
 * 
 * The point of this structure is to act as a shorthand and avoid instances in which we refer to a 
 * route as one thing in one place and another thing in a different place.
 */
const ROUTE_NAMES = {
  Home: "index",
  Messages: "messages",
  Insights: "insights",
  Game: "game",
  Debug: "debug"
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
      return require("assets/navigation-tab-icons/menu-icon-home.png");
    case ROUTE_NAMES.Messages:
      return require("assets/navigation-tab-icons/menu-icon-messages.png");
    case ROUTE_NAMES.Insights:
      return require("assets/navigation-tab-icons/menu-icon-insights.png");
    case ROUTE_NAMES.Game:
      return require("assets/navigation-tab-icons/menu-icon-game.png");
    case ROUTE_NAMES.Debug:
      return require("assets/navigation-tab-icons/menu-icon-debug.png");
    default:
      return require("assets/navigation-tab-icons/menu-icon-error.png");
  }
}

/**
 * Tab Navigator structure. Creates the "bottom tabs" system at the bottom of the screen.
 * Used to navigate between the "main tabs"
 */
export default function MainTabLayout() {
  return (
    <Tabs
      id={undefined}
      screenOptions={({ route }) => ({
        title: route.name == "index" ? "Home" : capitalize(route.name),
        tabBarIcon: ({color, size}) => {
          return <Image 
            style={{tintColor: color, width: size, height: size}} 
            source={getIcon(route.name)} 
          />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'black',
      })}
    />
  );
}
