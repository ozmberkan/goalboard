import { Outlet } from "react-router-dom";
import FlexContainer from "~/containers/FlexContainer";

const AuthLayout = () => {
  return (
    <FlexContainer>
      <Outlet />
    </FlexContainer>
  );
};

export default AuthLayout;
