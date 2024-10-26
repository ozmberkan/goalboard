import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "~/firebase/firebase";
import toast from "react-hot-toast";
import { set } from "react-hook-form";
import moment from "moment";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  allUsers: [],
  teamUsers: [],
  selectedPaymentType: "Silver",
  status: "idle",
  errorMessage: "",
};

export const signUpService = createAsyncThunk(
  "auth/signUp",
  async (data, { rejectWithValue }) => {
    try {
      const usersRef = collection(db, "users");
      const querySnapshot = await getDocs(usersRef);

      const isUsernameTaken = querySnapshot.docs.some((doc) => {
        return doc.data().username === data.username;
      });

      if (isUsernameTaken) {
        throw new Error("Kullanıcı adı zaten alınmış.");
      } else {
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
          disabled: false,
          photoURL: "",
          premium: "Silver",
          role: "user",
          notification: [],
          teams: [],
          createdAt: moment().format("DD.MM.YYYY HH:mm"),
        };

        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, userData);

        return userData;
      }
    } catch (error) {
      toast.error(error.message || "Bir hata oluştu");
      return rejectWithValue(error.message);
    }
  }
);

export const signInService = createAsyncThunk(
  "auth/signIn",
  async (data, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      await user.reload();

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      const userData = {
        uid: user.uid,
        email: user.email,
        username: userDoc.data()?.username || "Kullanıcı",
        premium: userDoc.data()?.premium || "silver",
        role: userDoc.data()?.role || "user",
        photoURL: userDoc.data()?.photoURL || "",
        notification: userDoc.data()?.notification || [],
        teams: userDoc.data()?.teams || [],
        disabled: userDoc.data()?.disabled || false,
        createdAt: userDoc.data()?.createdAt,
      };

      if (userData.disabled) {
        toast.error(
          "Hesabınız devre dışı bırakılmıştır. Yönetici ile iletişime geçiniz."
        );
        return rejectWithValue("Hesabınız devre dışı bırakılmıştır.");
      }

      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const forgotService = createAsyncThunk(
  "auth/forgot",
  async (data, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
    } catch (error) {
      toast.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getUserByID = createAsyncThunk("auth/getUserByID", async (id) => {
  try {
    const userRef = doc(db, "users", id);
    const userDoc = await getDoc(userRef);
    return userDoc.data();
  } catch (error) {
    console.log(error);
  }
});

export const getAllUserForAdmin = createAsyncThunk(
  "auth/getAllUserForAdmin",
  async (id) => {
    try {
      const userRef = collection(db, "users");
      const userDoc = await getDocs(userRef);
      const userData = userDoc.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return userData;
    } catch (error) {
      console.log(error);
    }
  }
);

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedPaymentType: (state, action) => {
      state.selectedPaymentType = action.payload;
    },
    setTeamsUser: (state, action) => {
      state.teamUsers = action.payload;
    },
  },
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
      })
      .addCase(getUserByID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserByID.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(getUserByID.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
      })
      .addCase(getAllUserForAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUserForAdmin.fulfilled, (state, action) => {
        state.status = "success";
        state.allUsers = action.payload;
      })
      .addCase(getAllUserForAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
      });
  },
});

export const { setSelectedPaymentType, setTeamsUser } = counterSlice.actions;

export default counterSlice.reducer;
