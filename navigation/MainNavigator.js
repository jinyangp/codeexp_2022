import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { HomeNavigator, AuthStackNavigator } from "./AppNavigator";

const MainNavigator = (props) => {
  // for now, a dummy useState to control screens user see
  // should change to redux's state in the future
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;
