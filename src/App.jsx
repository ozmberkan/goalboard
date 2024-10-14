import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeRoutes from "./routes/Home/HomeRoutes";
import AuthRoutes from "./routes/Home/AuthRoutes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/firebase";
import { setUserService } from "./redux/slices/userSlice";
import { doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const App = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));

          if (userDoc.exists()) {
            dispatch(
              setUserService({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                username: userDoc.data().username,
                premium: userDoc.data().premium || false,
                role: userDoc.data().role || "user",
                notification: userDoc.data().notification || [],
                teams: userDoc.data().teams || [],
              })
            );
          }
        } catch (error) {
          toast.error("Kullancı Bulunamıyor");
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const router = createBrowserRouter([HomeRoutes, AuthRoutes]);
  return <RouterProvider router={router} />;
};

export default App;
