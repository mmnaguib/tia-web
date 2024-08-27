// services/addCategory.ts

import Axiosinstance from "../config/axiosInstanse";
import toast from "react-hot-toast";
import { ICategory } from "../interfaces";

interface OnSubmitCategoryParams {
  data: FormData;
  token: string | null;
  navigate: (path: string) => void;
  closeModal: () => void;
}

export const onSubmitCategory = async ({
  data,
  token,
  navigate,
  closeModal,
}: OnSubmitCategoryParams): Promise<ICategory | null> => {
  try {
    const response = await Axiosinstance.post("/categories", data, {
      headers: {
        token: `Bearer ${token}`,
      },
    });

    toast.success("Category added successfully");
    navigate("/admin/categories");
    closeModal();

    return response.data; // Return the new category
  } catch (error) {
    toast.error("Failed to add category");
    console.error("Error adding category:", error);

    return null;
  }
};
