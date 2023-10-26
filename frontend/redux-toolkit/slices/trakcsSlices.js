import { createSlice } from "@reduxjs/toolkit";
import { getCurrentTrack, tracks } from "../actions/tracksActions";

const initialState = {
  currentTrack: {},
  tracks:[]
};
const currentTrackSlices = createSlice({
    name: "currentTrackSlices",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(getCurrentTrack.pending, (state, action) => {
        state.status = "pending";
      });
      builder.addCase(getCurrentTrack.fulfilled, (state, action) => {
        //action.payload
        state.currentTrack = action.payload;
        state.status = "success";
      });
      builder.addCase(getCurrentTrack.rejected, (state, action) => {
        state.status = "rejected";
      });

      builder.addCase(tracks.pending, (state, action) => {
        state.status = "pending";
      });
      builder.addCase(tracks.fulfilled, (state, action) => {
        //action.payload
        state.tracks = action.payload;
        state.status = "success";
      });
      builder.addCase(tracks.rejected, (state, action) => {
        state.status = "rejected";
      });
    },
  });
  
  export default currentTrackSlices.reducer;
  