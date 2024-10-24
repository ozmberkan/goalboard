import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import teamsReducer from "./slices/teamsSlice";
import projectsReducer from "./slices/projectsSlice";
import feedbacksReducer from "./slices/contactsSlice";
import verifiedReducer from "./slices/verifiedSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    teams: teamsReducer,
    projects: projectsReducer,
    feedbacks: feedbacksReducer,
    verified: verifiedReducer,
  },
});
