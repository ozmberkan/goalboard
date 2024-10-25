import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Container from "~/containers/Container";
import Footer from "~/components/Footer/Footer";
import Navbar from "~/components/Navbar/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByID } from "~/redux/slices/userSlice";

const HomeLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    setInterval(() => {
      if (user?.uid) {
        dispatch(getUserByID(user?.uid));
      }
      console.log("çalıştı");
    }, 60000);
  }, [dispatch]);

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
