import { authLoader } from "~/loaders/AuthLoader";
import HomeLayout from "~/layouts/HomeLayout";
import Home from "~/pages/Home/Home";
import Profile from "~/pages/Profile/Profile";
import About from "~/pages/About/About";
import Contacts from "~/pages/Contacts/Contacts";
import Announcements from "~/pages/Announcements/Announcements";
import Invites from "~/pages/Invites/Invites";
import Settings from "~/pages/Settings/Settings";
import WhyUs from "~/pages/WhyUs/WhyUs";
import Services from "~/pages/Services/Services";
import Dashboard from "~/pages/Dashboard/Dashboard";

export const HomeRoute = {
  path: "/",
  element: <HomeLayout />,
  children: [
    { path: "/", element: <Home /> },
    { path: "about", element: <About /> },
    { path: "contacts", element: <Contacts /> },
    { path: "announcements", element: <Announcements /> },
    {
      path: "profile/:username",
      element: <Profile />,
      loader: () => authLoader(["admin", "user"]),
    },
    {
      path: "dashboard/:teamID",
      element: <Dashboard />,
      loader: () => authLoader(["admin", "user"]),
    },
    {
      path: "invites",
      element: <Invites />,
      loader: () => authLoader(["admin", "user"]),
    },
    {
      path: "settings",
      element: <Settings />,
      loader: () => authLoader(["admin", "user"]),
    },

    { path: "why-us", element: <WhyUs /> },
    { path: "services", element: <Services /> },
  ],
};
