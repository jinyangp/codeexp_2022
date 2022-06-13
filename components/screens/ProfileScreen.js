import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { palette, theme } from "../../utils";

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      </View>

      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Settings")}
        >
          <Text style={styles.text}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("History")}
        >
          <Text style={styles.text}>History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  headerContainer: {
    padding: 20,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  button: {
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2,
  },
  text: {
    color: theme.colors.text,
    fontSize: 20,
  },
  headerText: {
    fontSize: 40,
  },
});
