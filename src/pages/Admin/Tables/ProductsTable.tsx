import { Link } from "react-router-dom";
import useProducts from "../../../services/getAllProducts";
import Swal from "sweetalert2";
import { onDeleteProduct } from "../../../services/deleteProduct";
import { UseAppSelector } from "../../../app/hooks";

const ProductsTable = () => {
  const { token } = UseAppSelector((state) => state.auth);
  const { products, setProducts } = useProducts();
  const handleDelete = async (_id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await onDeleteProduct({ _id, token });
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== _id)
        );
        Swal.fire("Deleted!", "Your category has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      Swal.fire({
        title: "Error",
        text: "There was an error deleting the category.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }
  };
  return (
    <div className="adminTable">
      <Link className="btn btn-primary addBtn" to="add-product">
        Add Product
      </Link>
      <table className="productName">
        <thead>
          <tr>
            <th>م</th>
            <th>المنتج</th>
            <th>السعر</th>
            <th>المتاح</th>
            <th>البراند</th>
            <th>الالوان</th>
            <th>الاحجام</th>
            <th>القسم</th>
            <th>الحركات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.inStock}</td>
              <td>{product.brand}</td>
              <td>
                {product.colors.flatMap((color) =>
                  color.split(",").map((c) => (
                    <span
                      key={c}
                      style={{
                        backgroundColor: `${c}`,
                        display: "inline-block",
                        marginLeft: "10px",
                        padding: "5px",
                        color: "#fff",
                      }}
                    >
                      {c}
                    </span>
                  ))
                )}
              </td>
              <td>
                {product.sizes?.flatMap((size) =>
                  size.split(",").map((s) => <span key={s}>{s}</span>)
                )}
              </td>
              <td>{product.category}</td>
              <td>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="btn btn-danger btn-sm"
                >
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
