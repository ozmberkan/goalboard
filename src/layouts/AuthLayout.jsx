import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className=" w-full h-screen flex justify-center items-center">
      <Outlet />
      <Toaster />
    </div>
  );
};

export default AuthLayout;
