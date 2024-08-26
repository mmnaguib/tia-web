import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./admin.scss";
import Navbar from "../../components/Navbar/Navbar";
const AdminLayout = () => {
  return (
    <div>
      <Navbar />
      <AdminSidebar />
      <div style={{ margin: "0 250px 0 0", padding: "30px" }}>
        <Outlet />
      </div>
    </div>
  );
};
export default AdminLayout;
