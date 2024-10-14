import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import teamSlice from "./slices/teamSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    teams: teamSlice,
  },
});
