import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/userReducer/userSlice.js";
import postReducer from "../features/postReducer/postSlice.js"


const appReducer = combineReducers({
    userReducer,
    postReducer
})

const store = configureStore({
    reducer: appReducer
})

export default store