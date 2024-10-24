import AdminLayout from "~/layouts/AdminLayout";
import { authLoader } from "~/loaders/AuthLoader";
import { lazy } from "react";

const Admin = lazy(() => import("~/pages/Admin/Admin"));
const AdminFeedBacks = lazy(() => import("~/pages/Admin/AdminFeedBacks"));
const AdminNotification = lazy(() => import("~/pages/Admin/AdminNotification"));
const AdminProjects = lazy(() => import("~/pages/Admin/AdminProjects"));
const AdminTeams = lazy(() => import("~/pages/Admin/AdminTeams"));
const AdminUsers = lazy(() => import("~/pages/Admin/AdminUsers"));

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
