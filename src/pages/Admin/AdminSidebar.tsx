import { NavLink } from "react-router-dom";
import { UseAppSelector } from "../../app/hooks";

const AdminSidebar = () => {
  const { user } = UseAppSelector((state) => state.auth);
  return (
    <div className="adminSidebar">
      <div className="admin-profile">
        {user?.firstname + " " + user?.lastname}
      </div>
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
        <NavLink to="/admin/users">
          <i className="fa-solid fa-users"></i>Users
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
