import { createSlice } from "@reduxjs/toolkit";
import { allArtist, getAllArtist } from "../actions/trackArtistActions";

const initialState = {
  artists: [],
  tracks:[]
};

const tracksArtistsSlices = createSlice({
  name: "tracksArtistsSlices",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(allArtist.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(allArtist.fulfilled, (state, action) => {
      //action.payload
      state.artists = action.payload;
      state.status = "success";
    });
    builder.addCase(allArtist.rejected, (state, action) => {
      state.status = "rejected";
    });
    //space//
    builder.addCase(getAllArtist.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getAllArtist.fulfilled, (state, action) => {
      //action.payload
      state.artists = action.payload;
      state.status = "success";
    });
    builder.addCase(getAllArtist.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export default tracksArtistsSlices.reducer;
