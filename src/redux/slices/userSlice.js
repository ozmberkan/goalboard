import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "~/firebase/firebase";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  status: "idle",
  errorMessage: "",
};

export const signUpService = createAsyncThunk("auth/signUp", async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const user = userCredential.user;
  } catch (error) {
    toast.error(error);
  }
});

export const signInService = createAsyncThunk("auth/signIn", async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const user = userCredential.user;
  } catch (error) {
    toast.error(error);
  }
});

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpService.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(signUpService.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
      })
      .addCase(signInService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signInService.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(signInService.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
      });
  },
});

export const {} = counterSlice.actions;

export default counterSlice.reducer;
