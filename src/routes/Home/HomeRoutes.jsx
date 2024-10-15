import HomeLayout from "~/layouts/HomeLayout";
import About from "~/pages/Footer/About";
import Contact from "~/pages/Footer/Contact";
import Home from "~/pages/Home/Home";
import Profile from "~/pages/Profile/Profile";
import CreateTeam from "~/pages/Teams/CreateTeam";
import TeamDetail from "~/pages/Teams/TeamDetail/TeamDetail";

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
      path: "/about",
      element: <About />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/create-team",
      element: <CreateTeam />,
    },
    {
      path: "/team/:id",
      element: <TeamDetail />,
    },
  ],
};

export default HomeRoutes;
