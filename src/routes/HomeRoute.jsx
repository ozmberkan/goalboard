import Home from "~/pages/Home/Home";
import HomeLayout from "~/layouts/HomeLayout";
import Contacts from "~/pages/Contacts/Contacts";
import About from "~/pages/About/About";
import Pricing from "~/pages/Pricing/Pricing";
import Announcements from "~/pages/Announcements/Announcements";
import Profile from "~/pages/Profile/Profile";
import Invites from "~/pages/Invites/Invites";
import Settings from "~/pages/Settings/Settings";
import WhyUs from "~/pages/WhyUs/WhyUs";
import Services from "~/pages/Services/Services";

export const HomeRoute = {
  path: "/",
  element: <HomeLayout />,
  children: [
    { path: "/", element: <Home /> },
    { path: "about", element: <About /> },
    { path: "contacts", element: <Contacts /> },
    { path: "pricing", element: <Pricing /> },
    { path: "announcements", element: <Announcements /> },
    { path: "profile/:username", element: <Profile /> },
    { path: "invites", element: <Invites /> },
    { path: "settings", element: <Settings /> },
    { path: "why-us", element: <WhyUs /> },
    { path: "services", element: <Services /> },
  ],
};
