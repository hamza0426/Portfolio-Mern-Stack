import { configureStore } from "@reduxjs/toolkit";

import { authReducer, passwordReducer, profileReducer } from "./slices/user"; // <-- Correct path to index.js
import { default as messageReducer } from "./slices/Message/messagesSlice";

export const store = configureStore({
  reducer: {
    // User Reducers
    auth: authReducer,
    profile: profileReducer,
    password: passwordReducer,

    // Message Reducers
    messages: messageReducer,
  },
});
