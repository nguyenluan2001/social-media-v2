import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "./slices/profileSlice"
export const store=configureStore({
    reducer:{
        "profile":ProfileReducer
    }
})
