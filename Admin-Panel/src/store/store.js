import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./slices/userSlice"
import {
  authReducer,
  passwordReducer,
  profileReducer,
  infoReducer,
} from "./userSlices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    password: passwordReducer,
    userInfo: infoReducer,
  },
});
