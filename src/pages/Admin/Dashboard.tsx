import { UseAppSelector } from "../../app/hooks";

const Dashboard = () => {
  // const {users} = UseAppSelector(state => state.auth)
  const { products } = UseAppSelector((state) => state.product);
  return (
    <div className="admin-dashboard">
      <div className="admin-cards">
        <div className="card">
          <h2>Users</h2>
        </div>
        <div className="card">
          <h2>Products</h2>
          <b>{products && products.length}</b>
        </div>
        <div className="card">
          <h2>Categories</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
