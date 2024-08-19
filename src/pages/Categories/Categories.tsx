import { useCallback, useEffect, useState } from "react";
import actProductsCategory from "../../app/act/Product/actProductsCategory";
import { UseAppDispatch } from "../../app/hooks";
import Axiosinstance from "../../config/axiosInstanse";

export interface ICategory {
  name: string;
  image?: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const dispatch = UseAppDispatch();

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

  const categoryProductsHandler = useCallback(
    async (categoryName: string) => {
      try {
        dispatch(actProductsCategory(categoryName));
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    },
    [dispatch]
  );

  return (
    <div className="categoriesContent">
      {categories.map((category) => (
        <div
          key={category.name}
          className="category"
          onClick={() => categoryProductsHandler(category.name)}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
