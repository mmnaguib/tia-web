// src/services/categoryService.ts

import Axiosinstance from "../config/axiosInstanse";
import toast from "react-hot-toast";

interface OnSubmitParams {
  data: FormData;
  token: string | null;
  navigate: (path: string) => void;
}

export const onSubmitProduct = async ({
  data,
  token,
  navigate,
}: OnSubmitParams) => {
  try {
    await Axiosinstance.post("/products", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        token: `Bearer ${token}`,
      },
    }).then(() => {
      toast.success("Product is Added");
      navigate("/admin/products");
    });
  } catch (error) {
    toast.error("Failed to add product");
  }
};
