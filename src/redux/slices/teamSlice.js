import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase";

const initialState = {
  teams: [],
  status: "idle" || "pending" || "success" || "failed",
  errorMessage: "",
};

export const getDetailTeamsByID = createAsyncThunk(
  "teams/getDetailTeamsById",
  async (id, { rejectWithValue }) => {
    try {
      const teamsRef = doc(db, "teams", id);
      const team = await getDoc(teamsRef);
      return team.data();
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDetailTeamsByID.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getDetailTeamsByID.fulfilled, (state, action) => {
        state.teams = action.payload;
        state.status = "success";
      })
      .addCase(getDetailTeamsByID.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = "Bir Hata ile karşılaşıldı.";
      });
  },
});

export const {} = teamSlice.actions;

export default teamSlice.reducer;
