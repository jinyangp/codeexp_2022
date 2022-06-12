import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import Context from "../../context/Context";

// to access sign out function
import { auth } from "../../config/firebase";

function SettingsScreen() {
  const globalContext = useContext(Context);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
      <Button
        title="Log out"
        onPress={() => {
          auth
            .signOut()
            .then(() => {
              globalContext.globalValues.logout();
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      />
    </View>
  );
}

export default SettingsScreen;
