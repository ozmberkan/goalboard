import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "~/firebase/firebase";
import moment from "moment";

const initialState = {
  teams: [],
  status: "idle",
  errorMessage: "",
};

const createdAt = moment().format("DD.MM.YYYY HH:mm");

export const createTeam = createAsyncThunk(
  "teams/createTeam",
  async ({ teamName, id }, thunkAPI) => {
    try {
      const teamsRef = doc(collection(db, "teams"));
      const userRef = doc(db, "users", id);

      const teamData = {
        teamID: teamsRef.id,
        createrMember: id,
        teamName: teamName,
        createdAt,
        members: [],
        projects: [],
      };

      await setDoc(teamsRef, teamData);

      await updateDoc(userRef, {
        teams: arrayUnion(teamsRef.id),
      });

      await updateDoc(teamsRef, {
        members: arrayUnion(id),
      });

      return teamData;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllTeams = createAsyncThunk("teams/getAllTeams", async () => {
  try {
    const teamsRef = collection(db, "teams");
    const teamsSnapshot = await getDocs(teamsRef);
    const teams = teamsSnapshot.docs.map((doc) => doc.data());
    return teams;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.status = "success";
        state.teams = [...state.teams, action.payload];
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
      })
      .addCase(getAllTeams.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllTeams.fulfilled, (state, action) => {
        state.status = "success";
        state.teams = action.payload;
      })
      .addCase(getAllTeams.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
      });
  },
});

export const {} = teamsSlice.actions;
export default teamsSlice.reducer;
