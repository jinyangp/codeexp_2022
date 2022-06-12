import {collection, query, where, onSnapshot} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import {View, Text} from "react-native";
import { useContext, useEffect } from 'react';
import Context from '../../context/Context';
import ChatFloatingIcon from './ChatFloatingIcon';

export default function Chats() {
    const { currentUser } = auth;
    const { rooms, setRooms } = useContext(Context)
    const chatsQuery = query(
        collection(db,"rooms"),
        where("participantsArray", "array-contains", currentUser.email)
        );
    useEffect(() => {
        const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
            const parsedChats = querySnapshot.docs.filter(
                doc => doc.data().lastMessage
            ).map((doc) =>({
                ...doc.data(),
                id: doc.id,
                userB: doc
                .data()
                .participants.find(p => p.email !== currentUser.email),
            }));
            setRooms(parsedChats)
        });
        return () => unsubscribe();
    }, [])

    return(<View style={{flex:1, padding:50}}>
        <Text>Chats</Text>
        {/* <ChatFloatingIcon/> */}
    </View>)
}