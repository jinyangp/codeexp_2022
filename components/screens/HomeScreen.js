import React, { useEffect, useState } from "react";
import {collection, query, orderBy, onSnapshot} from "firebase/firestore";
import {db} from '../../config/firebase';


import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { palette, theme } from "../../utils";
import { FontAwesome } from '@expo/vector-icons'; 

function HomeScreen({ route, navigation }) {
  const [deliverToValue, setDeliverToValue] = useState("");
  const [searchValue, setSearchValue] = useState("");


  const [rooms, setRooms] = useState([]);
  const [filteredData, setFilteredData] = useState([]);



  useEffect(() => {
    const q = query(collection(db, 'rooms'), orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setRooms(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])

  useEffect(() => {
    setFilteredData(
      rooms.filter(
        (item) =>
          item.data.storeName.toLowerCase().includes(searchValue.toLowerCase()) &&
          item.data.deliverTo.toLowerCase().includes(deliverToValue.toLowerCase())
      )
    );
  }, [searchValue, deliverToValue, rooms]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.listItem}
        onPress={() => {
          navigation.navigate("Room",  item.id );
        }}
      >
        <View style={styles.leftItem}>
          <Text style={{fontSize: 30}}>{Math.min(100,parseInt((item.data.currentAmount / item.data.goal)  * 100))}%</Text>
          <Text>complete</Text>
        </View>
        <View style={styles.rightItem}>
          <Text style={styles.text}>Store: {item.data.storeName}</Text>
          <Text style={styles.text}>To: {item.data.deliverTo}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", width: "100%"}}>
          <Text style={styles.headerText}>Food Qwest</Text>
          <FontAwesome name="user-circle-o" size={40} color="grey" />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Search:"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="none"
          // autoFocus={true}
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Deliver To:"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="none"
          // autoFocus={true}
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
            navigation.navigate("Create Room");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Create A Room</Text>
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
    paddingTop: 20,
    paddingHorizontal: 12,
  },
  headerContainer: {
    padding: 20,
    alignItems: "flex-start",
    paddingBottom: 10,
  },
  headerText: {
    color: theme.colors.text,
    fontSize: 40,
  },
  input: {
    backgroundColor: "#FFE8B7",
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
  },
  button: {
    backgroundColor: '#FA6E59',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    alignSelf: "center",
    fontSize: 20,
  },
  listItem: {
    padding: 10,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  leftItem: {
    width: "20%",
    alignItems: 'center',
  },
  rightItem: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#FFCF54',
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    color: theme.colors.text,
  }
});
