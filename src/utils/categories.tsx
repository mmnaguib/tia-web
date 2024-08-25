import { useState, useEffect } from "react";
import Axiosinstance from "../config/axiosInstanse";

export interface ICategory {
  name: string;
  image?: string;
}

const useCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const fetchCategories = async () => {
    try {
      const res = await Axiosinstance.get<ICategory[]>("/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories };
};

export default useCategories;
