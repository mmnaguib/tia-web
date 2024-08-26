import Axiosinstance from "../config/axiosInstanse";
import toast from "react-hot-toast";

interface OnEditParams {
  data: FormData;
  token: string | null;
  navigate: (path: string) => void;
  closeEditModal: () => void;
  _id: string;
}

export const onEditCategory = async ({
  data,
  token,
  navigate,
  closeEditModal,
  _id,
}: OnEditParams) => {
  try {
    await Axiosinstance.put(`/categories/` + _id, data, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    toast.success("Category Edit successfully");
    navigate("/admin/categories");
    closeEditModal();
  } catch (error) {
    toast.error("Failed to Editing category");
    console.error("Error Editing category:", error);
  }
};
