// src/services/categoryService.ts

import Axiosinstance from "../config/axiosInstanse";
import toast from "react-hot-toast";

interface OnSubmitParams {
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
}: OnSubmitParams) => {
  try {
    await Axiosinstance.post("/categories", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        token: `Bearer ${token}`,
      },
    }).then(() => {
      toast.success("Category is Added");
      navigate("/admin/categories");
      closeModal();
    });
  } catch (error) {
    toast.error("Failed to add category");
  }
};
