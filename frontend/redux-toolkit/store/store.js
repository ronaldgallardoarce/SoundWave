import { configureStore } from "@reduxjs/toolkit";
import userLoginSlices from "../slices/userLoginSlices";
import tracksArtistsSlices from "../slices/trackArtistSlices";
const store = configureStore({
  reducer: {
    login: userLoginSlices,
    tracksArtistsSlices: tracksArtistsSlices,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;