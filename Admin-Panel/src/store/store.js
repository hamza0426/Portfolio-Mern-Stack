import { configureStore } from "@reduxjs/toolkit";

import { authReducer, passwordReducer, profileReducer } from "./slices/user"; // <-- Correct path to index.js
import { default as messageReducer } from "./slices/Message/messageSlice";
import { default as timelineReducer } from "./slices/Timeline/timelineSlice";
import { default as skillReducer } from "./slices/Skill/skillSlice";
import { default as applicationReducer } from "./slices/Application/applicationSlice";
import { default as projectReducer } from "./slices/Project/projectSlice";

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

    // Application Reducer
    applications: applicationReducer,

    // Project Reducer
    projects: projectReducer,
  },
});
