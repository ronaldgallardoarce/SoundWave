import { configureStore } from "@reduxjs/toolkit";
import userLoginSlices from "../slices/userLoginSlices";

const store = configureStore({
    reducer:{
        login: userLoginSlices
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
})

export default store;