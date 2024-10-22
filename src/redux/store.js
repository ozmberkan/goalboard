import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import teamsReducer from "./slices/teamsSlice";
import projectsReducer from "./slices/projectsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    teams: teamsReducer,
    projects: projectsReducer,
  },
});
