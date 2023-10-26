import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getCurrentTrack = createAsyncThunk("/currentTrack", async (payload) => {
    try {
        return payload
    } catch (error) {
        return error.message;
    }
});

export const tracks = createAsyncThunk("/tracks", async () => {
    try {
        const response = await axios.get("track/");
        return response.data;
    } catch (error) {
        return error.message;
    }
});