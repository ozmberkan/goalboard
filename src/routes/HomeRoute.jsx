import Home from "~/pages/Home/Home";
import HomeLayout from "~/layouts/HomeLayout";

export const HomeRoute = {
  path: "/",
  element: <HomeLayout />,
  children: [{ path: "/", element: <Home /> }],
};
