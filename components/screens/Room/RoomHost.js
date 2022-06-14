import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput
  
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { palette, theme } from "../../../utils";
import {db} from '../../../config/firebase';
import {collection, query, orderBy, onSnapshot, updateDoc, FieldValue, doc, arrayUnion, getDoc, docSnap} from "firebase/firestore";


function RoomHost({ data }) {
  const { info, navigation } = data;

  const [ roomInfo, setRoomInfo] = useState();
  const [ percent, setPercent ] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  // form
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newOrder = {
        foodName: name,
        amount: parseInt(quantity),
        price: parseInt(price) ,
      };
      addOrder(newOrder);
      setModalVisible(false);
      // onClose()
    } catch (err) {
      alert(err)
    }
  }
  // end region



  useEffect(() => {

    const q = query(collection(db, 'rooms'), orderBy('created', 'desc'))

    onSnapshot(q, (querySnapshot) => {
      setRoomInfo(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })).filter(e => e.id == info)[0])
    })
  },[])

  useEffect( () => {
    if(roomInfo != null) {
      setPercent(Math.min(1, roomInfo.data.currentAmount / roomInfo.data.goal));
    }
  }, [roomInfo])

  // const [orders, setOrders] = useState([
  //   {
  //     foodName: "Curry Fish Head",
  //     amount: 1,
  //   },
  //   {
  //     foodName: "Chicken Rice",
  //     amount: 4,
  //   },
  //   {
  //     foodName: "Plain Roti Prata",
  //     amount: 5,
  //   },
  //   {
  //     foodName: "Roti Prata with Egg",
  //     amount: 6,
  //   },
  // ]);
  
  // // Hacky code for demoing the data
  // const [totalAmount, setTotalAmount] = useState(info.goal);
  // const [currAmount, setCurrAmount] = useState(Math.round(info.percentCompleted / 100 * info.goal));
  // const [percent, setPercent] = useState(info.percentCompleted / 100);

  // useEffect(() => {
  //   const accumulatedAmount = 0;
  //   orders.forEach( order => {
  //     accumulatedAmount += order.amount;
  //   });
  //   setCurrAmount(accumulatedAmount);
  // }, orders)

  // Keep this code for later use
  // useEffect(() => {
  //   setPercent(currAmount / totalAmount);
  // }, [currAmount]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(item);
        }}
      >
        <Text style={styles.listItem}>
          {item.foodName} x {item.amount}
        </Text>
      </TouchableOpacity>
    );
  };

  const addOrder = async (newOrder) => {

    const roomsDocsRef = doc(db, 'rooms', info)

    try{
      const docSnap = await getDoc(roomsDocsRef);
    
      const currentRoom = docSnap.data();
      const currentOrders = currentRoom.orders;
      if(currentOrders.some(order => order.foodName == newOrder.foodName)){
        const newArr = currentOrders.map(order => {
        const currentOrder = currentOrders.find(order => order.foodName == newOrder.foodName);
          if(order.foodName == newOrder.foodName){
            return {
              ...order, amount: newOrder.amount + currentOrder.amount,
            }
          } else {
            return order;
          }
        })
        await updateDoc(roomsDocsRef, {
          orders: newArr ,
          currentAmount: roomInfo.data.currentAmount + newOrder.price * newOrder.amount,
        })
      } else { 
        await updateDoc(roomsDocsRef, {
          orders: arrayUnion({
            foodName: newOrder.foodName,
            amount: newOrder.amount,
            price: newOrder.price, 
          }),
          currentAmount: roomInfo.data.currentAmount + newOrder.price * newOrder.amount,
        })
      }

      // onClose()
    } catch (err) {
      alert(err)
    }    
  }

  return (
    roomInfo == null ?  <View style={styles.container}><Text>Loading</Text></View>: (
      <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.text}>Store: </Text>
          <Text style={styles.text}>{roomInfo.data.storeName}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.text}>To: </Text>
          <Text style={styles.text}>{roomInfo.data.deliverTo}</Text>
        </View>
      </View>
      <View style={styles.centeredView}>
      <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
    <TouchableOpacity style={styles.modal} activeOpacity={1} onPress={() => setModalVisible(!modalVisible)}>
    <View>
        <TextInput
          style={styles.input}
          placeholder="Food Name:"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="none"
          // autoFocus={true}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Price:"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="none"
          // autoFocus={true}
          value={price}
          onChangeText={(text) => setPrice(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity:"
          // autoCapitalize="none"
          keyboardType="phone-pad"
          textContentType="none"
          // autoFocus={true}
          value={quantity}
          onChangeText={(text) => setQuantity(text)}
        />
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add order</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
        

      
    </Modal>

    </View>

      <View style={styles.bodyContainer}>
        <View style={styles.statusContainer}>
          <Text style={{alignSelf:"center"}}>
            ${roomInfo.data.currentAmount} / ${roomInfo.data.goal}
          </Text>
          <View style={styles.statusBar}>
            <View
              style={{
                backgroundColor: "#FA6E59",
                borderRadius: 10,
                // height: `{${roomInfo.data.percentCompleted}}}%`,
                height: `${Math.floor(percent* 100)}%`,
              }}
            />
          </View>
        </View>

        <View style={styles.orderContainer}>
          <Text style={{fontSize: 30, color: theme.colors.text,}}>Orders</Text>
          <FlatList data={roomInfo.data.orders} renderItem={renderItem} />
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
        <TouchableOpacity  onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbox-ellipses-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </View>
    )

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
    backgroundColor: '#FFCF54',
    borderRadius: 20,
  },
  bodyContainer: {
    flex: 1,
    padding: 20,
    paddingRight: 0,
    flexDirection: "row",
  },
  footerContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: '#FFCF54',
    borderRadius: 20,
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
    color: theme.colors.text,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "100%",
    height: "50%",
    marginTop: "auto",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#FFCF54",
    borderRadius: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#444',
    alignSelf: 'center',
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#FFE8B7",
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 12,
  },
  button: {
    backgroundColor: '#FA6E59',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    alignSelf: "center",
    fontSize: 20,
  },

  



  
});
