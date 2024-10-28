import { lazy } from "react";
import { authLoader } from "~/loaders/AuthLoader";
import AdminLayout from "~/layouts/AdminLayout";
const Admin = lazy(() => import("~/pages/Admin/Admin"));
const AdminUsers = lazy(() => import("~/pages/Admin/AdminUsers"));
const AdminTeams = lazy(() => import("~/pages/Admin/AdminTeams"));
const AdminProjects = lazy(() => import("~/pages/Admin/AdminProjects"));
const AdminFeedBacks = lazy(() => import("~/pages/Admin/AdminFeedBacks"));
const AdminNotification = lazy(() => import("~/pages/Admin/AdminNotification"));
const AdminPremiumUsers = lazy(() => import("~/pages/Admin/AdminPremiumUsers"));

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
    {
      path: "/admin/premium-users",
      element: <AdminPremiumUsers />,
      loader: () => authLoader(["admin"]),
    },
  ],
};
