import AuthLayout from "~/layouts/AuthLayout";
import Login from "~/pages/Auth/Login/Login";
import Register from "~/pages/Auth/Register/Register";

const AuthRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "login",
      element: <Login />,
    },
  ],
};

export default AuthRoutes;
