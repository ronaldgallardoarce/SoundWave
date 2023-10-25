import { createAsyncThunk } from "@reduxjs/toolkit";
export const signin = createAsyncThunk("/test", async (payload) => {
    try {
      return payload
    } catch (error) {
      return error.message;
    }
  });