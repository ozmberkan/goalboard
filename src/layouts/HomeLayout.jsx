import { Outlet } from "react-router-dom";
import Container from "~/containers/Container";
import Footer from "~/components/Footer/Footer";
import Navbar from "~/components/Navbar/Navbar";

const HomeLayout = () => {
  return (
    <Container>
      <Navbar />
      <Outlet />
      <Footer />
    </Container>
  );
};

export default HomeLayout;
