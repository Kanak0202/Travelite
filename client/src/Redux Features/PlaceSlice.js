import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    viewedPlaces: [],
};

const viewedPlacesSlice = createSlice({
  name: "viewedPlaces",
  initialState,
  reducers: {
    addPlace: (state, action) => {
        console.log(action.payload);
        state.viewedPlaces.push(action.payload);
    }
  },
});

export const { addPlace } = viewedPlacesSlice.actions;

export default viewedPlacesSlice.reducer;