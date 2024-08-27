import Axiosinstance from "../config/axiosInstanse";
import toast from "react-hot-toast";

interface OnDeleteParams {
  _id: string;
  token: string | null;
}

export const onDeleteProduct = async ({ _id, token }: OnDeleteParams) => {
  try {
    await Axiosinstance.delete("/products/" + _id, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    toast.success("product deleted successfully");
  } catch (error) {
    toast.error("Failed to delete product");
    console.error("Error deleting product:", error);
  }
};
