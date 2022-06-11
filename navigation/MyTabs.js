
import ChatScreen from "../components/screens/ChatScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "../components/screens/Login";
import Signup from "../components/screens/Signup";
import HomeDrawer from "./HomeDrawer";

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" options={{headerShown: false}} component={HomeDrawer} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="SignUp" component={Signup} />
        
      </Tab.Navigator>
    );
  }

export default MyTabs;