import * as FileSystem from "expo-file-system";

export const ADD_PLACE = "ADD_PLACE";

export const addPlace = (title, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C${location.lat},${location.lng}&key=${Map.API_KEY}`
    );
    if (!response.ok)
      throw new "no se ha podico comunicar con Google Maps API"();

    const resData = await response.json();
    if (!resData.results)
      throw new Error("no se encontraron datos seleccionados");
    const address = resData.results[0].formatted_address;
    console.log(address);

    dispatch({
      type: ADD_PLACE,
      payload: { title, address, lat: location.lat, lng: location.lng },
    });
  };
};
