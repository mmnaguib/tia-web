import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="adminSidebar">
      <div className="admin-profile">profile</div>
      <hr />
      <div className="admin-links">
        <NavLink to="/admin" end className="admin-link">
          <i className="fa-solid fa-gauge"></i>
          Dashboard
        </NavLink>
        <NavLink to="/admin/categories">
          <i className="fa-solid fa-table"></i>Categories
        </NavLink>
        <NavLink to="/admin/products">
          <i className="fa-solid fa-table"></i>Products
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
