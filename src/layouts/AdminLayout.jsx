import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import AdminSidebar from "~/components/Admin/AdminSidebar";
import FlexContainer from "~/containers/FlexContainer";

const AdminLayout = () => {
  return (
    <FlexContainer>
      <Toaster />
      <AdminSidebar />
      <Outlet />
    </FlexContainer>
  );
};

export default AdminLayout;
