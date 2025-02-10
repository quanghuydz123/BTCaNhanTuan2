import { configureStore, } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducers";

const store = configureStore({
    reducer:{
        authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,  // Disables non-serializable check (not recommended)
        }),
})


export default store