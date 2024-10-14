import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import AuthNavbar from "~/components/Navbar/AuthNavbar.jsx/AuthNavbar";
import Navbar from "~/components/Navbar/Navbar";
import Container from "~/containers/Container";

const AuthLayout = () => {
  return (
    <div className=" w-full h-screen flex justify-center items-center">
      <Container>
        <AuthNavbar />
        <Outlet />
        <Toaster />
      </Container>
    </div>
  );
};

export default AuthLayout;
