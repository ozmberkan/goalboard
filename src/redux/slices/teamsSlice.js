import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "~/firebase/firebase";
import moment from "moment";

const initialState = {
  teams: [],
  allTeams: [],
  currentTeam: null,
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
        creatorMember: id,
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

export const getTeamByID = createAsyncThunk(
  "teams/getTeamByID",
  async (id, { rejectWithValue }) => {
    try {
      const teamsRef = doc(db, "teams", id);
      const teamDoc = await getDoc(teamsRef);

      return teamDoc.data();
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getAllTeams = createAsyncThunk(
  "teams/getAllTeams",
  async (uid, thunkAPI) => {
    try {
      const teamsRef = collection(db, "teams");
      const q = query(teamsRef, where("members", "array-contains", uid));
      const teamsSnapshot = await getDocs(q);
      const teams = teamsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return teams;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllTeamsForAdmin = createAsyncThunk(
  "auth/getAllTeamsForAdmin",
  async (id) => {
    try {
      const teamsRef = collection(db, "teams");
      const teamsDoc = await getDocs(teamsRef);
      const teamsData = teamsDoc.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return teamsData;
    } catch (error) {
      console.log(error);
    }
  }
);

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
      })
      .addCase(getTeamByID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTeamByID.fulfilled, (state, action) => {
        state.status = "success";
        state.currentTeam = action.payload;
      })
      .addCase(getTeamByID.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
      })
      .addCase(getAllTeamsForAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllTeamsForAdmin.fulfilled, (state, action) => {
        state.status = "success";
        state.allTeams = action.payload;
      })
      .addCase(getAllTeamsForAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
      });
  },
});

export const {} = teamsSlice.actions;
export default teamsSlice.reducer;
