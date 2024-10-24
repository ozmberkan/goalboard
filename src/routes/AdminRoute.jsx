import AdminLayout from "~/layouts/AdminLayout";
import { authLoader } from "~/loaders/AuthLoader";
import Admin from "~/pages/Admin/Admin";

export const AdminRoute = {
  path: "/",
  element: <AdminLayout />,
  children: [
    { path: "/admin", element: <Admin />, loader: () => authLoader(["admin"]) },
  ],
};
