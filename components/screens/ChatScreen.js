import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { collection, query, onSnapshot, orderBy, addDoc, } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { GiftedChat } from 'react-native-gifted-chat';
import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';




function ChatScreen() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([])

  useEffect(() => {
    readUser();
    const chatsRef = collection(db, "chats")
    const q = query(chatsRef, orderBy('createdAt','desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messageFirestore = querySnapshot.docs.map(doc => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user
      }))
      setMessages(messageFirestore)
    })
    return () => unsubscribe();
  }, [])
  
 
    async function readUser() {
      const user = await AsyncStorage.getItem('user')
      if (user) {
        setUser(JSON.parse(user))

      }
    }
    
    async function handlePress() {
      const _id = Math.random().toString(36).substring(7)
      const user = {_id, name}
      
      await AsyncStorage.setItem('user', JSON.stringify(user))
      setUser(user)
    }

    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages)
      );
      const { _id, createdAt, text, user } = messages[0];    
      addDoc(collection(db, 'chats'), {
        _id,
        createdAt,
        text,
        user
      });
    }, []);
  

    if (!user) {
      return (<View style={styles.container}>
        <TextInput style ={styles.input} placeholder='name' value={name} onChangeText={setName}/>
        <Button title="Enter the chat" onPress={handlePress}/>
      </View>)
    }

    return (
        <GiftedChat messages={messages} user={user} onSend={messages => onSend(messages)}/>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
    },
    input: {
      height: 50,
      width: '100%',
      borderWidth: 1,
      padding: 15,
      marginBottom: 20,
      borderColor: 'grey',
    }
  })

export default ChatScreen;