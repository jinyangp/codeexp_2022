import { TouchableOpacity,Text, } from "react-native";
import {MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native";

export default function ChatFloatingIcon() {
    const navigation = useNavigation()
    return (
        <TouchableOpacity 
        onPress={() => navigation.navigate('Groups')}
        style={{
        position:'absolute',
        right: 20,
        bottom: 20,
        borderRadius: 60,
        width: 60,
        height: 60,alignItems: "center",
        justifyContent: "center",}}>
            <MaterialCommunityIcons
                name="android-messages"
                size={30}
                color='pink'
                style={{transform:[{scaleX:-1}]}}
            ></MaterialCommunityIcons>
        </TouchableOpacity>
    )
}