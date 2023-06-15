import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "../components/PlaceItem";
import React from "react";
import { useSelector } from "react-redux";

const PlaceListScreen = () => {
  const places = useSelector((state) => state.places.places);

  const renderItem = ({ data }) => (
    <PlaceItem
      title={data.title}
      address={data.item.address}
      onSelect={() => navigation.navigate("Detalle", { placeId: item.id })}
    />
  );

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PlaceListScreen;
