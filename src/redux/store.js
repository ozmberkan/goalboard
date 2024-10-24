import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import teamsReducer from "./slices/teamsSlice";
import projectsReducer from "./slices/projectsSlice";
import feedbacksReducer from "./slices/contactsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    teams: teamsReducer,
    projects: projectsReducer,
    feedbacks: feedbacksReducer,
  },
});
