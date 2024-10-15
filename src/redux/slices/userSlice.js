import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { auth, db } from "~/firebase/firebase";

const initialState = {
  user: null,
  status: "idle" || "loading" || "success" || "failed",
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

      await updateProfile(user, {
        displayName: data.displayName,
      });

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        username: data.username,
        premium: false,
        role: "user",
        notification: [],
        teams: [],
      };

      const userRef = doc(db, "users", user.uid);

      await setDoc(userRef, userData);

      return userData;
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

      const userDoc = await getDoc(doc(db, "users", user.uid));

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        username: userDoc.data().username,
        premium: userDoc.data().premium || false,
        role: userDoc.data().role || "user",
        notification: userDoc.data().notification || [],
        teams: userDoc.data().teams || [],
      };

      return userData;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const setUserService = createAsyncThunk("auth/setUser", async (data) => {
  try {
    return data;
  } catch (error) {
    console.log(error.message);
  }
});

export const getUserByID = createAsyncThunk("auth/getUserByID", async (id) => {
  try {
    const userRef = doc(db, "users", id);

    const userData = await getDoc(userRef);
    return userData.data();
  } catch (error) {
    console.log(error);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerService.pending, (state) => {
        state.status = "loading";
        state.errorMessage = "";
      })
      .addCase(registerService.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        state.errorMessage = "";
      })
      .addCase(registerService.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload || "Registration failed";
      })
      .addCase(loginService.pending, (state) => {
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
      .addCase(setUserService.pending, (state) => {
        state.status = "loading";
        state.errorMessage = "";
      })
      .addCase(setUserService.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        state.errorMessage = "";
      })
      .addCase(setUserService.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload;
      })
      .addCase(getUserByID.pending, (state) => {
        state.status = "loading";
        state.errorMessage = "";
      })
      .addCase(getUserByID.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        state.errorMessage = "";
      })
      .addCase(getUserByID.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
