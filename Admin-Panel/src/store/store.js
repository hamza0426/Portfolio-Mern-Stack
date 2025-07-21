import { configureStore } from "@reduxjs/toolkit";

import {
  authReducer,
  passwordReducer,
  profileReducer,
  infoReducer,
} from "./slices/user"; // <-- Correct path to index.js

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    password: passwordReducer,
    userInfo: infoReducer,
  },
});
