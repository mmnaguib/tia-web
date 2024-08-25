import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="adminSidebar">
      <div className="admin-profile">profile</div>
      <hr />
      <div className="admin-links">
        <NavLink to="/admin" className="admin-link">
          Dashboard
        </NavLink>
        <NavLink to="/admin/addCategory">Add New Category</NavLink>
        <NavLink to="/admin/addProduct">Add New Product</NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
