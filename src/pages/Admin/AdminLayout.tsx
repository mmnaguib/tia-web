import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./admin.scss";
const AdminLayout = () => {
  return (
    <div>
      <AdminSidebar />
      <div style={{ margin: "0 250px", padding: "30px" }}>
        <Outlet />
      </div>
    </div>
  );
};
export default AdminLayout;
