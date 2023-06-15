import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";

import { COLORS } from "../constants";
import LocationSelector from "../components/LocationSelector";
import { addPlace } from "../store/places.actions";

const NewPlaceScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleTitleChange = (text) => setTitle(text);

  const handleSave = () => {
    dispatch(addPlace(title));
    navigation.navigate("Direcciones");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Título</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={handleTitleChange}
          />
        </View>
        <LocationSelector />
        <Button
          title="Guardar dirección"
          color={COLORS.PRIMARY}
          onPress={handleSave}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
});

export default NewPlaceScreen;
