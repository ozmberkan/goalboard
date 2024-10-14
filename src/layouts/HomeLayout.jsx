import Navbar from "~/components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Container from "~/containers/Container";
import Footer from "~/components/Footer/Footer";
import { Toaster } from "react-hot-toast";

const HomeLayout = () => {
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
