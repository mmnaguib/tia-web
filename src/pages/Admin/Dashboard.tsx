import useCategories from "../../services/getAllCategories";
import useProducts from "../../services/getAllProducts";
import useUsers from "../../services/getAllUsers";

const Dashboard = () => {
  // const {users} = UseAppSelector(state => state.auth)
  const { categories } = useCategories();
  const { products } = useProducts();
  const { users } = useUsers();
  return (
    <div className="admin-dashboard">
      <div className="admin-cards">
        <div className="card">
          <h2>Users</h2>
          <b>{users && users.length}</b>
        </div>
        <div className="card">
          <h2>Products</h2>
          <b>{products && products.length}</b>
        </div>
        <div className="card">
          <h2>Categories</h2>
          <b>{categories && categories.length}</b>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
