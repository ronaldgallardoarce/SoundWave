import { configureStore } from "@reduxjs/toolkit";
import loginSlices from '../slices/userLogin.Slices';

const store = configureStore({
    reducer:{
        login: loginSlices
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
})

export default store;