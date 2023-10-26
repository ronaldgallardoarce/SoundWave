import { createAsyncThunk } from "@reduxjs/toolkit";
export const signin = createAsyncThunk("/signin", async (payload) => {
    try {
      return payload
    } catch (error) {
      return error.message;
    }
  });
  export const login = createAsyncThunk("/login", async (payload) => {
    console.log(payload)
    try {
      return payload
    } catch (error) {
      return error.message;
    }
  });