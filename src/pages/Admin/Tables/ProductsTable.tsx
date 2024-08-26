import { Link } from "react-router-dom";
import { UseAppSelector } from "../../../app/hooks";

const ProductsTable = () => {
  const { products } = UseAppSelector((state) => state.product);
  return (
    <div className="adminTable">
      <Link className="btn btn-primary addBtn" to="add-product">
        Add Product
      </Link>
      <table className="productName">
        <thead>
          <tr>
            <th>م</th>
            <th>القسم</th>
            <th>الصورة</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>
                <img src={product.images[0]} alt="" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
