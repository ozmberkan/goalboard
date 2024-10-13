import Navbar from "~/components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Container from "~/containers/Container";

const HomeLayout = () => {
  return (
    <Container>
      <Navbar />
      <Outlet />
    </Container>
  );
};

export default HomeLayout;
