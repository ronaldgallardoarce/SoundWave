import { configureStore } from "@reduxjs/toolkit";
import userLoginSlices from "../slices/userLoginSlices";
import tracksArtistsSlices from "../slices/trackArtistSlices";
import trakcsSlices from "../slices/trakcsSlices";
const store = configureStore({
  reducer: {
    login: userLoginSlices,
    tracksArtistsSlices: tracksArtistsSlices,
    currentTrack:trakcsSlices
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;