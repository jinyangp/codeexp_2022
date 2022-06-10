import { Text, View } from 'react-native';
import { query, where } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { GiftedChat } from 'react-native-gifted-chat';

function ChatScreen() {
  // const chatsQuery = query(
  //   collection(db, "rooms"),
  //   where("participantsArray", "array-contains", )
  // )
    return (
        <GiftedChat/>
    );
  }

export default ChatScreen;