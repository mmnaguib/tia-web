import { Link } from "react-router-dom";

const ProductsTable = () => {
  return (
    <div>
      <Link to="add-product">Add Product</Link>
      <table>
        <thead>
          <tr>
            <th>3</th>
            <th>2</th>
            <th>1</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>3</td>
            <td>2</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
