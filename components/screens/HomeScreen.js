import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import { palette, theme } from '../../utils';

const testData = [
  {
    storeName: "McDonalds", percentCompleted: "80%",
  },
  {
    storeName: "KFC", percentCompleted: "50%",
  },
  {
    storeName: "KFC", percentCompleted: "50%",
  },
  {
    storeName: "KFC", percentCompleted: "50%",
  },
  {
    storeName: "KFC", percentCompleted: "50%",
  },
  {
    storeName: "KFC", percentCompleted: "50%",
  },
  {
    storeName: "McDonalds", percentCompleted: "80%",
  },
  {
    storeName: "McDonalds", percentCompleted: "80%",
  },
  {
    storeName: "McDonalds", percentCompleted: "80%",
  },
  {
    storeName: "McDonalds", percentCompleted: "80%",
  },
  {
    storeName: "McDonalds", percentCompleted: "80%",
  }
];

function HomeScreen({ navigation }) {
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(testData.filter((item) => item.storeName.toLowerCase().includes(searchValue.toLowerCase())));
  }, [searchValue]);

  const renderItem = ({ item }) => {
    return (
      <Text style={styles.listItem}>Store Name : {item.storeName} , Percentage : {item.percentCompleted} //TODO</Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer} >
        <TextInput
          style={styles.input}
          placeholder='Search:'
          autoCapitalize='none'
          keyboardType='default'
          textContentType='none'
          autoFocus={true}
          value={searchValue}
          onChangeText={text => setSearchValue(text)}
        />
      </View>

      <FlatList data={filteredData} renderItem={renderItem} />

      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => {navigation.navigate("CreateGroup")}} style={styles.button}>
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
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  headerContainer: {
    padding: 20,
    alignItems: 'flex-start',
    marginBottom: 10,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 12,
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
      alignSelf: 'center',
      fontSize: 20,
  },
  listItem: {
    padding: 20,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1, 
    fontSize: 15,   
  }
});
