import HomeLayout from "~/layouts/HomeLayout";
import Home from "~/pages/Home/Home";
import Profile from "~/pages/Profile/Profile";
import CreateTeam from "~/pages/Teams/CreateTeam";

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
    {
      path: "/create-team",
      element: <CreateTeam />,
    },
  ],
};

export default HomeRoutes;
