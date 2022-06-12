import React, { useEffect, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { HomeNavigator, AuthNavigator } from "./AppNavigator";

// firebase dependecies
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

// get global context
import Context from "../context/Context";

const MainNavigator = (props) => {
  const [error, setError] = useState(null);
  const globalContext = useContext(Context);

  // Event listener to listen whether a user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      try {
        // If there's a user, there's a user logged in
        if (user) {
          globalContext.globalValues.login();
        }
      } catch (err) {
        setError(err);
        console.log(err);
      }
    });

    return () => unsubscribe();
  });

  useEffect(() => {
    console.log(globalContext.globalValues.isAuth);
  }, [globalContext.globalValues.isAuth]);

  return (
    <NavigationContainer>
      {globalContext.globalValues.isAuth ? (
        <HomeNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;
