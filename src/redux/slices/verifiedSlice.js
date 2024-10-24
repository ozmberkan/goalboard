import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "~/firebase/firebase";

const initialState = {
  allVerified: [],
  status: "idle",
  errorMessage: "",
};

export const getAllVerifiedForAdmin = createAsyncThunk(
  "auth/getAllVerifiedForAdmin",
  async () => {
    try {
      const verifiedRef = collection(db, "verified");
      const verifiedDoc = await getDocs(verifiedRef);
      const verifiedData = verifiedDoc.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return verifiedData;
    } catch (error) {
      console.log(error);
    }
  }
);

export const verifiedSlice = createSlice({
  name: "verified",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllVerifiedForAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllVerifiedForAdmin.fulfilled, (state, action) => {
        state.status = "success";
        state.allVerified = action.payload;
      })
      .addCase(getAllVerifiedForAdmin.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const {} = verifiedSlice.actions;
export default verifiedSlice.reducer;
