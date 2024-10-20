import AuthLayout from "~/layouts/AuthLayout";
import ForgotPassword from "~/pages/Auth/Forgot/ForgotPassword";
import SignIn from "~/pages/Auth/SignIn/SignIn";
import SignUp from "~/pages/Auth/SignUp/SignUp";

export const AuthRoute = {
  path: "/",
  element: <AuthLayout />,
  children: [
    { path: "/signup", element: <SignUp /> },
    { path: "/signin", element: <SignIn /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
  ],
};
