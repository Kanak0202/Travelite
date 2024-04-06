import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Redux Features/UserSlice";
import placesViewedReducer from "./Redux Features/PlaceSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    viewedPlaces: placesViewedReducer
  },
});

export default store;