import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import FlexContainer from "~/containers/FlexContainer";

const AuthLayout = () => {
  return (
    <FlexContainer>
      <Outlet />
      <Toaster />
    </FlexContainer>
  );
};

export default AuthLayout;
