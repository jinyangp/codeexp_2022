import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { palette, theme } from "../../utils";

const testData = [
  {
    storeName: "McDonalds",
    percentCompleted: "80%",
    deliverTo: "Kranji Camp",
  },
  {
    storeName: "KFC",
    percentCompleted: "50%",
    deliverTo: "Maju Camp",
  },
  {
    storeName: "KFC",
    percentCompleted: "50%",
    deliverTo: "Maju Camp",
  },
  {
    storeName: "KFC",
    percentCompleted: "50%",
    deliverTo: "Maju Camp",
  },
  {
    storeName: "KFC",
    percentCompleted: "50%",
    deliverTo: "Maju Camp",
  },
  {
    storeName: "KFC",
    percentCompleted: "50%",
    deliverTo: "Maju Camp",
  },
  {
    storeName: "KFC",
    percentCompleted: "50%",
    deliverTo: "Maju Camp",
  },
  {
    storeName: "McDonalds",
    percentCompleted: "80%",
    deliverTo: "Kranji Camp",
  },
  {
    storeName: "McDonalds",
    percentCompleted: "80%",
    deliverTo: "Kranji Camp",
  },
];

function HomeScreen({ navigation }) {
  const [deliverToValue, setDeliverToValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [unfilteredData, setUnfilteredData] = useState(testData);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(
      unfilteredData.filter(
        (item) =>
          item.storeName.toLowerCase().includes(searchValue.toLowerCase()) &&
          item.deliverTo.toLowerCase().includes(deliverToValue.toLowerCase())
      )
    );
  }, [searchValue, deliverToValue, unfilteredData]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Room", { ...item });
        }}
      >
        <Text style={styles.listItem}>
          Store Name : {item.storeName} , Percentage : {item.percentCompleted} ,
          To : {item.deliverTo}
          //TODO
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Food Qwest</Text>
        <TextInput
          style={styles.input}
          placeholder="Search:"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="none"
          autoFocus={true}
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Deliver To:"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="none"
          autoFocus={true}
          value={deliverToValue}
          onChangeText={(text) => setDeliverToValue(text)}
        />
      </View>

      <View style={styles.bodyContainer}>
        <FlatList data={filteredData} renderItem={renderItem} />
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CreateGroup");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Create A Party</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  headerContainer: {
    padding: 20,
    alignItems: "flex-start",
    paddingBottom: 10,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2,
  },
  headerText: {
    color: theme.colors.text,
    fontSize: 40,
  },
  input: {
    backgroundColor: "#fff",
    marginVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    padding: 10,
    width: "100%",
  },
  footerContainer: {
    padding: 20,
    borderTopColor: "lightgrey",
    borderTopWidth: 2,
  },
  button: {
    backgroundColor: theme.colors.secondary,
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "black",
    alignSelf: "center",
    fontSize: 20,
  },
  listItem: {
    padding: 20,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    fontSize: 15,
    color: theme.colors.secondaryText,
  },
  bodyContainer: {
    flex: 1,
  },
});
