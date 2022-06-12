import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { palette, theme } from "../../../utils";

function RoomHost({ data }) {
  const { info, navigation } = data;

  const [orders, setOrders] = useState([
    {
      foodName: "Curry Fish Head",
      amount: 1,
    },
    {
      foodName: "Chicken Rice",
      amount: 4,
    },
    {
      foodName: "Roti Prata",
      amount: 11,
    },
  ]);

  const [totalAmount, setTotalAmount] = useState(54);
  const [currAmount, setCurrAmount] = useState(27);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setPercent(currAmount / totalAmount);
  }, [currAmount]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log("Go to order");
        }}
      >
        <Text style={styles.listItem}>
          {item.foodName} x {item.amount}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.text}>Store: </Text>
          <Text style={styles.text}>{info.storeName}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.text}>To: </Text>
          <Text style={styles.text}>{info.deliverTo}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.text}>From: </Text>
          <Text style={styles.text}>current location //TODO?</Text>
        </View>
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.statusContainer}>
          <Text>
            ${currAmount} / ${totalAmount}
          </Text>
          <View style={styles.statusBar}>
            <View
              style={{
                backgroundColor: "blue",
                borderRadius: 10,
                height: `${Math.floor(percent * 100).toString()}%`,
              }}
            />
          </View>
        </View>

        <View style={styles.orderContainer}>
          <Text
            style={{
              fontColor: theme.colors.text,
              fontSize: 20,
              fontWeight: "50",
            }}
          >
            Orders
          </Text>
          <FlatList data={orders} renderItem={renderItem} />
        </View>
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-circle-outline"
            size={40}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Add/ Edit order")}>
          <Ionicons name="add-circle-outline" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbox-ellipses-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default RoomHost;

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
  bodyContainer: {
    flex: 1,
    padding: 20,
    paddingRight: 0,
    flexDirection: "row",
  },
  footerContainer: {
    padding: 20,
    borderTopColor: "lightgrey",
    borderTopWidth: 2,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  orderContainer: {
    padding: 20,
    width: "80%",
  },
  statusContainer: {
    width: "20%",
    justifyContent: "center",
  },
  statusBar: {
    backgroundColor: "#fff",
    borderColor: "orange",
    borderWidth: 2,
    height: "90%",
    borderRadius: 10,
    justifyContent: "flex-end",
    marginTop: 10,
  },
  text: {
    marginVertical: 4,
    fontColor: theme.colors.text,
    fontSize: 20,
  },
  listItem: {
    padding: 20,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    fontSize: 15,
    color: theme.colors.secondaryText,
    width: "100%",
  },
});
