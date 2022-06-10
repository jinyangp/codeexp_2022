import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './navigation/MyTabs';
import { useAssets } from 'expo-asset';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

function App() {
  // const [currUser, setCurrUser] = useState(null)
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const unsubcribe = onAuthStateChanged(auth, user => {
  //     setLoading(false);
  //     if (user) {
  //       setCurrUser(user);
  //     }
  //   });
  //   return () => unsubcribe()
  // }, []);

  // if (loading) {
  //   return <Text>Loading...</Text>
  // }

  return (
    <NavigationContainer>
      <MyTabs/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function Main() {
  const [assets] = useAssets(
    require("./assets/icon-square.png"),
    require("./assets/chatbg.png"),
    require("./assets/user-icon.png"),
  );
  if (!assets) {
    return <Text>Loading ..</Text>;
  }
  return <App/>
}

export default Main;
// npm run ios 