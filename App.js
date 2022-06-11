import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useAssets } from "expo-asset";
import * as Font from "expo-font";

// from previous version NOTE
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./config/firebase";

import MainNavigator from "./navigation/MainNavigator";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  // from previous version NOTE
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

  useEffect(() => {
    const prepareApp = () => {
      SplashScreen.preventAutoHideAsync()
        .then(() => {
          return Font.loadAsync({
            "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
            "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setAppIsReady(true);
        });
    };
    prepareApp();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
  const [assets] = useAssets(
    require("./assets/icon-square.png"),
    require("./assets/chatbg.png"),
    require("./assets/user-icon.png")
  );

  if (!appIsReady || !assets) {
    return null;
  }

  return (
    <View style={styles.rootView} onLayout={onLayoutRootView}>
      <MainNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
});
