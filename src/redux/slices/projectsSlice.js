import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "~/firebase/firebase";

const initialState = {
  projects: [],
  currentProject: null,
  status: "idle",
  errorMessage: "",
};

export const getAllProjects = createAsyncThunk(
  "projects/getAllProjects",
  async () => {
    try {
      const projectsRef = collection(db, "projects");

      const projectsDoc = await getDocs(projectsRef);

      const projects = projectsDoc.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return projects;
    } catch (error) {
      console.log(error);
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
      .addCase(getAllProjects.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getProjectsByID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProjectsByID.fulfilled, (state, action) => {
        state.status = "success";
        state.currentProject = action.payload;
      })
      .addCase(getProjectsByID.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const {} = projectsSlice.actions;
export default projectsSlice.reducer;
