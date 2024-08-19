import { useCallback, useEffect, useState } from "react";
import actProductsCategory from "../../app/act/Product/actProductsCategory";
import { IProduct } from "../../interfaces";
import { UseAppDispatch } from "../../app/hooks";
import Axiosinstance from "../../config/axiosInstanse";
import ProductList from "../Products/ProductList";

export interface ICategory {
  name: string;
  image?: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<IProduct[]>([]);
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
        const res = await Axiosinstance.get<IProduct[]>(
          `/catProducts?categoryName=${categoryName}`
        );
        setCategoryProducts(res.data);
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
