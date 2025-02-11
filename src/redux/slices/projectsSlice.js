import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "~/firebase/firebase";

const initialState = {
  projects: [],
  allProjects: [],
  currentProject: null,
  status: "idle",
  errorMessage: "",
};

export const getAllProjects = createAsyncThunk(
  "teams/getAllProjects",
  async (teamID, { rejectWithValue }) => {
    try {
      if (!teamID) {
        throw new Error("Geçersiz kullanıcı UID");
      }

      const projectsRef = collection(db, "projects");
      const q = query(projectsRef, where("creatorTeam", "==", teamID));
      const projectsSnapshot = await getDocs(q);
      const projects = projectsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return projects;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const getProjectsByID = createAsyncThunk(
  "projects/getProjectsByID",
  async (projectID) => {
    try {
      const projectRef = doc(db, "projects", projectID);
      const projectData = await getDoc(projectRef);
      return projectData.data();
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllProjectsForAdmin = createAsyncThunk(
  "auth/getAllProjectsForAdmin",
  async () => {
    try {
      const projectsRef = collection(db, "projects");
      const projectsDoc = await getDocs(projectsRef);
      const projectsData = projectsDoc.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return projectsData;
    } catch (error) {
      console.log(error);
    }
  }
);

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.status = "success";
        state.projects = action.payload;
      })
      .addCase(getAllProjects.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getProjectsByID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProjectsByID.fulfilled, (state, action) => {
        state.status = "success";
        state.currentProject = action.payload;
      })
      .addCase(getProjectsByID.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getAllProjectsForAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProjectsForAdmin.fulfilled, (state, action) => {
        state.status = "success";
        state.allProjects = action.payload;
      })
      .addCase(getAllProjectsForAdmin.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {} = projectsSlice.actions;
export default projectsSlice.reducer;
