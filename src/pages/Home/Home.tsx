import { Alert } from "react-bootstrap";
import { UseAppSelector } from "../../app/hooks";
import Categories from "../Categories/Categories";
import ProductList from "../Products/ProductList";
import "./home.scss";
const Home = () => {
  const { products } = UseAppSelector((state) => state.product);
  return (
    <>
      <Categories />
      {products.length > 0 ? (
        <ProductList />
      ) : (
        <Alert variant="warning" className="noProductsInCategory">
          No Products In This Category
        </Alert>
      )}
    </>
  );
};

export default Home;
