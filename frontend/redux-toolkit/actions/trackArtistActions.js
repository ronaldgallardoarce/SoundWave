import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
export const allArtist = createAsyncThunk("/allArtist", async (payload) => {
  try {
    return payload;
  } catch (error) {
    return error.message;
  }
});
export const getAllArtist = createAsyncThunk("/getAllArtist", async () => {
  try {
    console.log("vamos a ver");
    const response = await axios.get(
      "artist/get"
    ); 
    console.log(response.data)
    return response.data;
  } catch (error) {
    return error.message;
  }
});
