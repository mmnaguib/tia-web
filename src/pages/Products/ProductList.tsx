import { useEffect } from "react";
import { UseAppDispatch, UseAppSelector } from "../../app/hooks";
import actProducts from "../../app/act/Product/actProducts";
import "./product.scss";
import { sliceDescription } from "../../utils/functions";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { addProductToCart } from "../../app/slices/CartSlice";

const ProductList = () => {
  const { products } = UseAppSelector((state) => state.product);
  const dispatch = UseAppDispatch();
  const { t } = useTranslation();
  const quantity = 1;
  useEffect(() => {
    dispatch(actProducts());
  }, [dispatch]);

  const ProductsList = products.map((product) => (
    <div key={product._id} className="productCard">
      <Link to={`/products/${product._id}`}>
        <img
          src={"http://localhost:3000/" + product.images[0]}
          alt="product image"
        />
      </Link>
      <h2>{sliceDescription(product.title, 24)}</h2>
      <p className="description">{sliceDescription(product.description, 50)}</p>
      {/*<div className="sizes">
        <span className="propName">{t("avaibleSizes")}</span>
        {product.sizes?.map((size) => (
          <span>{size}</span>
        ))}
      </div>
      <div className="colors">
        <span className="propName">{t("avaibleColors")}</span>
        {product.colors?.map((color) => (
          <span>{color}</span>
        ))}
      </div> */}
      <div className="priceABrand">
        <span>${product.price}</span>
        <span>{product.brand}</span>
      </div>
      <div className="lastDivInCard">
        <div>
          {product.category.name}
          {/* <img src={product.category.image} alt="category" /> */}
        </div>
        {/* <div>
          {t("numberInStock")} {product.inStock}
        </div> */}
      </div>
      <div>
        <button
          onClick={() => dispatch(addProductToCart({ product, quantity }))}
          className="addToCartBtn"
        >
          {t("addToCart")}
        </button>
      </div>
    </div>
  ));
  return <div className="productsList">{ProductsList}</div>;
};

export default ProductList;
