import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";

// Since we have multiple reducers, to combine all, we use combineReducers func
const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
});

export default rootReducer;