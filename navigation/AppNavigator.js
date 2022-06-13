import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

// group buy related
import ChatScreen from "../components/screens/ChatScreen";
import CreateGroup from "../components/screens/CreateGroup";
import ExploreScreen from "../components/screens/ExploreScreen";
import HomeScreen from "../components/screens/HomeScreen";
import MainRoom from "../components/screens/Room/MainRoom";

// admin related
import SettingsScreen from "../components/screens/SettingsScreen";
import HistoryScreen from "../components/screens/HistoryScreen";
import ProfileScreen from "../components/screens/ProfileScreen";

// auth related
import Login from "../components/screens/Login";
import Signup from "../components/screens/Signup";

import { palette, theme } from "../utils";

// Create a stack navigator for all group related pages NOTE
// no need to be imported
const GroupBuyStackNavigator = createStackNavigator();

// Have to name HomeStack to avoid name clash with main navigator
const GroupBuyNavigator = () => {
  return (
    <GroupBuyStackNavigator.Navigator>
      <GroupBuyStackNavigator.Screen name="HomeStack" options={{headerShown: false}} component={HomeScreen} />
      <GroupBuyStackNavigator.Screen
        name="Create Room"
        component={CreateGroup}
      />
      <GroupBuyStackNavigator.Screen name="Explore" component={ExploreScreen} />
      <GroupBuyStackNavigator.Screen name="Chat" component={ChatScreen} />
      <GroupBuyStackNavigator.Screen name="Room" component={MainRoom} />
    </GroupBuyStackNavigator.Navigator>
  );
};

// Create a stack navigator for all admin related pages NOTE
// no need to be imported
const AdminStackNavigator = createStackNavigator();

const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator>
      <AdminStackNavigator.Screen name="Profile" component={ProfileScreen} />
      <AdminStackNavigator.Screen name="Settings" component={SettingsScreen} />
      <AdminStackNavigator.Screen name="History" component={HistoryScreen} />
    </AdminStackNavigator.Navigator>
  );
};

// Create a stack navigator for all auth related pages NOTE
// need to be imported
const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    // screenOptions = {} to add custom styling to stack screens
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen name="Login" component={Login} />
      <AuthStackNavigator.Screen name="SignUp" component={Signup} />
    </AuthStackNavigator.Navigator>
  );
};

// Create a bottom tab navigator NOTE MAIN NAVIGATOR NOTE
// need to be imported
const HomeTabsNavigator = createBottomTabNavigator();

export const HomeNavigator = () => {
  return (
    // screenOptions = {} to add custom styling to tabs
    <HomeTabsNavigator.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
      }}
    >
      <HomeTabsNavigator.Screen name="Home" component={GroupBuyNavigator} />
      <HomeTabsNavigator.Screen name="Admin" component={AdminNavigator} />
    </HomeTabsNavigator.Navigator>
  );
};
