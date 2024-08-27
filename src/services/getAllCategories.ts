import { useState, useEffect } from "react";
import Axiosinstance from "../config/axiosInstanse";
import { ICategory } from "../interfaces";

const useCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Axiosinstance.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return { categories, setCategories };
};

export default useCategories;
