import { useTranslation } from "react-i18next";
import { UseAppDispatch, UseAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import actProduct from "../../app/act/Product/actProduct";
import { Link, useParams } from "react-router-dom";
import "./product.scss";
const SingleProduct = () => {
  const { product } = UseAppSelector((state) => state.product);
  const dispatch = UseAppDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  useEffect(() => {
    dispatch(actProduct(id));
  }, [dispatch, id]);
  return (
    <div className="singleProduct">
      <div className="productImage">
        <img
          src={"http://localhost:3000/" + product.images[0]}
          alt="product image"
          width="500px"
        />
      </div>
      <div className="productDetail">
        <h2>{product.title}</h2>
        <p className="description">{product.description}</p>
        <div className="sizes">
          <span className="propName">{t("avaibleSizes")}</span>
          <div className="propsContent">
            {product.sizes?.map((size) => (
              <span>{size}</span>
            ))}
          </div>
        </div>
        <div className="colors">
          <span className="propName">{t("avaibleColors")}</span>
          <div className="propsContent">
            {product.colors?.map((color) => (
              <span>{color}</span>
            ))}
          </div>
        </div>
        <div className="priceABrand">
          <span className="price">${product.price}</span>
          <Link className="brand" to={`/products/${product.brand}`}>
            {product.brand}
          </Link>{" "}
          {/*اعمل لينك يبعتني علي كل البضاعة اللي البراند بتاعها دا  */}
        </div>
        <div className="lastDivInCard">
          <Link to={`/products/${product.category.name}`}>
            {/*اعمل لينك يبعتني علي كل البضاعة اللي القسم بتاعها دا  */}
            <img
              src={"http://localhost:3000/" + product.category.image}
              alt="category"
              width={50}
              height={50}
              style={{ borderRadius: "50%" }}
            />
            {product.category.name}
          </Link>
          <div className="stock">
            {t("numberInStock")} : {product.inStock}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <button className="addToCartBtn">{t("addToCart")}</button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
