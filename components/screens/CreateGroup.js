import React, {useState} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

function CreateGroup({ navigation }) {
  const [store, setStore] = useState("");
  const [destination, setDestination] = useState("");
  const [goal, setGoal] = useState("");

  const handleSubmit = () => {
    if (store && destination && goal) {
      navigation.navigate("HomeStack", {
        storeName: store,
        deliverTo: destination,
        goal: goal,
      });
    } else {
      alert("Please fill in all the fields");
    }
  };

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Store:"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="none"
          // autoFocus={true}
          value={store}
          onChangeText={(text) => setStore(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Destination:"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="none"
          // autoFocus={true}
          value={destination}
          onChangeText={(text) => setDestination(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Goal:"
          // autoCapitalize="none"
          keyboardType="phone-pad"
          textContentType="none"
          // autoFocus={true}
          value={goal}
          onChangeText={(text) => setGoal(text)}
        />
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Create A Room</Text>
        </TouchableOpacity>
      </View>
    );
  }

export default CreateGroup;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
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