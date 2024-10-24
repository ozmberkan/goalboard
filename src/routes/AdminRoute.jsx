import AdminLayout from "~/layouts/AdminLayout";
import { authLoader } from "~/loaders/AuthLoader";
import Admin from "~/pages/Admin/Admin";
import AdminFeedBacks from "~/pages/Admin/AdminFeedBacks";
import AdminNotification from "~/pages/Admin/AdminNotification";
import AdminProjects from "~/pages/Admin/AdminProjects";
import AdminTeams from "~/pages/Admin/AdminTeams";
import AdminUsers from "~/pages/Admin/AdminUsers";

export const AdminRoute = {
  path: "/",
  element: <AdminLayout />,
  children: [
    { path: "/admin", element: <Admin />, loader: () => authLoader(["admin"]) },
    {
      path: "/admin/users",
      element: <AdminUsers />,
      loader: () => authLoader(["admin"]),
    },
    {
      path: "/admin/teams",
      element: <AdminTeams />,
      loader: () => authLoader(["admin"]),
    },
    {
      path: "/admin/projects",
      element: <AdminProjects />,
      loader: () => authLoader(["admin"]),
    },
    {
      path: "/admin/feedbacks",
      element: <AdminFeedBacks />,
      loader: () => authLoader(["admin"]),
    },
    {
      path: "/admin/notification",
      element: <AdminNotification />,
      loader: () => authLoader(["admin"]),
    },
  ],
};
