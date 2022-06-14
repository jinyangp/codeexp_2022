import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert
  
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { palette, theme } from "../../../utils";
import {db} from '../../../config/firebase';
import {collection, query, orderBy, onSnapshot, updateDoc, doc, arrayUnion, getDoc, deleteDoc} from "firebase/firestore";


function RoomHost({ data }) {
  const { info, navigation } = data;

  const [ roomInfo, setRoomInfo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // form
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

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

    const cleanup = onSnapshot(q, (querySnapshot) => {
      setRoomInfo(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })).filter(e => e.id == info)[0])
    })


    return () => cleanup;


  },[])



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
        let newCompleted = false;
        if(roomInfo.data.currentAmount + newOrder.price * newOrder.amount >= roomInfo.data.goal) {
          newCompleted = true;
        }
        await updateDoc(roomsDocsRef, {
          orders: newArr ,
          currentAmount: roomInfo.data.currentAmount + newOrder.price * newOrder.amount,
          completed: newCompleted,
        })
      } else { 
        let newCompleted = false;
        if(roomInfo.data.currentAmount + newOrder.price * newOrder.amount >= roomInfo.data.goal) {
          newCompleted = true;
        }
        await updateDoc(roomsDocsRef, {
          orders: arrayUnion({
            foodName: newOrder.foodName,
            amount: newOrder.amount,
            price: newOrder.price, 
          }),
          currentAmount: roomInfo.data.currentAmount + newOrder.price * newOrder.amount,
          completed: newCompleted,
        })
      }

      // onClose()
    } catch (err) {
      alert(err)
    }    
  }

  const handleDelete = async () => {
    const roomsDocRef = doc(db, 'rooms', info)
    try{
      await deleteDoc(roomsDocRef)
      navigation.goBack();
    } catch (err) {
      alert(err)
    }
  }

  return (
    roomInfo == null ?  <View style={styles.container}><ActivityIndicator size="large" /></View>: (
      <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: "column", alignItems: "flex-end"}}>
          <Text style={[styles.text, styles.textBold]}>Store: </Text>
          <Text style={[styles.text, styles.textBold]}>To: </Text>
        </View>
        <View style={{ flexDirection: "column", alignItems: "flex-start", flex: 1}}>
          <View style={styles.textBox}>
            <Text style={styles.text}>{roomInfo.data.storeName}</Text>
          </View>
          <View style={styles.textBox}>
            <Text style={styles.text}>{roomInfo.data.deliverTo}</Text>
          </View>
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
          keyboardType="phone-pad"
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
                backgroundColor:`${roomInfo.data.completed ? "#4897D8" : "#FA6E59" }`,
                borderRadius: 10,
                height: `${Math.min(100, ((roomInfo.data.currentAmount / roomInfo.data.goal )* 100))}%`,
              }}
            />
          </View>
        </View>

        <View style={styles.orderContainer}>
          <Text style={{fontSize: 25, color: theme.colors.secondaryText,}}>Orders</Text>
          <FlatList data={roomInfo.data.orders} renderItem={renderItem} />
          { roomInfo.data.completed ?            <TouchableOpacity
          onPress={handleDelete}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Close room</Text>
        </TouchableOpacity>: null }

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
  },
  headerContainer: {
    padding: 20,
    paddingTop: 40,
    alignItems: "flex-start",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#FFCF54",
    flexDirection: "row"
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    fontSize: 20,
    color: theme.colors.text,
    marginVertical: 10,
  },
  textBold: {
    fontWeight: "bold",
  },
  textBox: {
    width:"100%", 
    backgroundColor:"#fff", 
    paddingHorizontal: 5, 
    borderWidth: .5, 
    borderColor: '#333',
    borderRadius: 8, 
    justifyContent: "center"
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
    height: 300,
    marginTop: "auto",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#FFCF54",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    marginBottom: 10,
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
