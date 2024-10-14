import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teams: [],
};

export const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
});

export const {} = teamSlice.actions;

export default teamSlice.reducer;
