import Axiosinstance from "../config/axiosInstanse";
import toast from "react-hot-toast";

interface OnDeleteParams {
  id: string;
  token: string | null;
  navigate: (path: string) => void;
}

export const onDeleteCategory = async ({
  id,
  token,
  navigate,
}: OnDeleteParams) => {
  try {
    await Axiosinstance.delete("/categories/" + id, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    toast.success("Category deleted successfully");
    navigate("/admin/categories");
  } catch (error) {
    toast.error("Failed to delete category");
    console.error("Error deleting category:", error);
  }
};
