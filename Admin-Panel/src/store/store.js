import { configureStore } from "@reduxjs/toolkit";

import { authReducer, passwordReducer, profileReducer } from "./slices/user"; // <-- Correct path to index.js
import { default as messageReducer } from "./slices/Message/messagesSlice";
import { default as timelineReducer } from "./slices/Timeline/timelineSlice";
import { default as skillReducer } from "./slices/Skill/skillSlice";

export const store = configureStore({
  reducer: {
    // User Reducers
    auth: authReducer,
    profile: profileReducer,
    password: passwordReducer,

    // Message Reducer
    messages: messageReducer,

    // Timeline Reducer
    timelines: timelineReducer,

    // Skill Reducer
    skills: skillReducer,
  },
});
