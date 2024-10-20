import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "~/firebase/firebase";
import toast from "react-hot-toast";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  status: "idle",
  errorMessage: "",
};

export const signUpService = createAsyncThunk("auth/signUp", async (data) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const user = userCredential.user;

    const userData = {
      uid: user.uid,
      email: user.email,
      username: data.username,
      emailVerified: user.emailVerified,
      premium: false,
      role: "user",
      notification: [],
    };

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, userData);

    return userData;
  } catch (error) {
    toast.error(error);
  }
});
export const signInService = createAsyncThunk("auth/signIn", async (data) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));

    const userData = {
      uid: user.uid,
      email: user.email,
      username: userDoc.data?.username || "Kullanıcı",
      emailVerified: user.emailVerified,
      premium: userDoc.data?.premium || false,
      role: userDoc.data?.role || "user",
      notification: userDoc.data?.notification || [],
    };

    return userData;
  } catch (error) {
    toast.error(error);
  }
});
export const forgotService = createAsyncThunk("auth/forgot", async (data) => {
  try {
    await sendPasswordResetEmail(auth, data.email);
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
