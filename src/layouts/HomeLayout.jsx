import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByID } from "~/redux/slices/userSlice";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "~/firebase/firebase";
import Container from "~/containers/Container";
import Footer from "~/components/Footer/Footer";
import Navbar from "~/components/Navbar/Navbar";

const HomeLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    if (user?.uid) {
      const userDocRef = doc(db, "users", user.uid);

      const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          dispatch(getUserByID(docSnap.id));
        }
      });

      return () => unsubscribe();
    }
  }, [dispatch, user?.uid]);

  return (
    <Container>
      <Toaster />
      <Navbar />
      <Outlet />
      <Footer />
    </Container>
  );
};

export default HomeLayout;
