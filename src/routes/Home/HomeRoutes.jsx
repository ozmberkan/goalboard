import HomeLayout from "~/layouts/HomeLayout";
import Home from "~/pages/Home/Home";
import Profile from "~/pages/Profile/Profile";

const HomeRoutes = {
  path: "/",
  element: <HomeLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ],
};

export default HomeRoutes;
