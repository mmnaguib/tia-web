import { Alert } from "react-bootstrap";
import { UseAppDispatch, UseAppSelector } from "../../app/hooks";
import Categories from "../Categories/Categories";
import ProductList from "../Products/ProductList";
import "./home.scss";
import { useEffect } from "react";
import actProducts from "../../app/act/Product/actProducts";
const Home = () => {
  const { products } = UseAppSelector((state) => state.product);
  const dispatch = UseAppDispatch();
  useEffect(() => {
    dispatch(actProducts());
  }, [dispatch]);
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
