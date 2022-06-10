import HomeScreen from "../components/screens/HomeScreen";
import ChatScreen from "../components/screens/ChatScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "../components/screens/Login";
import Signup from "../components/screens/Signup";

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="SignUp" component={Signup} />
        
      </Tab.Navigator>
    );
  }

export default MyTabs;