import { Outlet } from "react-router-dom";
import FlexContainer from "~/containers/FlexContainer";

const AuthLayout = () => {
  return (
    <FlexContainer>
      <div className="bg-red-500 w-1/2 flex-grow">1</div>
      <div className="w-1/2 bg-blue-500 flex-grow">
        <Outlet />
      </div>
    </FlexContainer>
  );
};

export default AuthLayout;
