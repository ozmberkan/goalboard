import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "~/firebase/firebase";

const initialState = {
  allFeedbacks: [],
  status: "idle",
  errorMessage: "",
};

export const getAllFeedBacksForAdmin = createAsyncThunk(
  "auth/getAllFeedBacksForAdmin",
  async () => {
    try {
      const contactsRef = collection(db, "contacts");
      const contactsDoc = await getDocs(contactsRef);
      const contactsData = contactsDoc.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return contactsData;
    } catch (error) {
      console.log(error);
    }
  }
);

export const feedbacksSlice = createSlice({
  name: "feedbacks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeedBacksForAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllFeedBacksForAdmin.fulfilled, (state, action) => {
        state.status = "success";
        state.allFeedbacks = action.payload;
      })
      .addCase(getAllFeedBacksForAdmin.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {} = feedbacksSlice.actions;
export default feedbacksSlice.reducer;
