
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../components/screens/HomeScreen';
import HistoryScreen from '../components/screens/HistoryScreen';
import SettingsScreen from '../components/screens/SettingsScreen';

const Drawer = createDrawerNavigator();

function HomeDrawer({ navigation }) {
    return (
        <Drawer.Navigator useLegacyImplementation>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="History" component={HistoryScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
    );
  }

export default HomeDrawer;