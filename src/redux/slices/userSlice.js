import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "~/firebase/firebase";

const initialState = {
  user: null,
  status: "idle",
  errorMessage: "",
};

export const registerService = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      return user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const loginService = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      return user;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerService.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        state.errorMessage = "";
      })
      .addCase(registerService.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload || "Registration failed";
      })
      .addCase(registerService.pending, (state) => {
        state.status = "loading";
        state.errorMessage = "";
      })
      .addCase(loginService.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        state.errorMessage = "";
      })
      .addCase(loginService.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload || "Registration failed";
      })
      .addCase(loginService.pending, (state) => {
        state.status = "loading";
        state.errorMessage = "";
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
