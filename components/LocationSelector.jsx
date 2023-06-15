import * as Location from "expo-location";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants";
import MapPreview from "./MapPreview";
import { useNavigation } from "@react-navigation/native";

const LocationSelector = ({ onLocation }) => {
  const navigation = useNavigation();
  const [pickedLocation, setPickedLocation] = useState();

  const verifyPermissions = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();

      if (status !== "granted") {
        const { status: newStatus } =
          await Location.requestForegroundPermissionsAsync();

        if (newStatus !== "granted") {
          Alert.alert(
            "Permisos insuficientes",
            "Necesitamos permisos para acceder a la ubicación",
            [{ text: "Ok" }]
          );
          return false;
        }
      }

      return true;
    } catch (error) {
      console.log("Error al verificar los permisos:", error);
      return false;
    }
  };

  const handleGetLocation = async () => {
    const isLocationOk = await verifyPermissions();
    if (!isLocationOk) return;

    try {
      const location = await Location.getCurrentPositionAsync();
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      onLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      console.log("Error al obtener la ubicación:", error);
    }
  };

  return (
    <View style={styles.container}>
      <MapPreview location={pickedLocation} newStyles={styles.preview}>
        {pickedLocation ? (
          <Text>Ubicación en proceso...</Text>
        ) : (
          <Text>No se ha seleccionado ninguna ubicación</Text>
        )}
      </MapPreview>

      <Button
        title="Obtener ubicación"
        color={COLORS.SECONDARY}
        onPress={handleGetLocation}
      />
    </View>
  );
};

export default LocationSelector;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  preview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.PEACH_PUFF,
    borderWidth: 1,
  },
});
