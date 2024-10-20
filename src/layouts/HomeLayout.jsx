import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Container from "~/containers/Container";
import Footer from "~/components/Footer/Footer";
import Navbar from "~/components/Navbar/Navbar";

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
