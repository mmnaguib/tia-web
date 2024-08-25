import { useCallback } from "react";
import actProductsCategory from "../../app/act/Product/actProductsCategory";
import { UseAppDispatch } from "../../app/hooks";
import actProducts from "../../app/act/Product/actProducts";
import useCategories from "../../utils/categories";

export interface ICategory {
  name: string;
  image?: string;
}

const Categories = () => {
  const { categories } = useCategories();
  const dispatch = UseAppDispatch();

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

  const showAllProducts = useCallback(async () => {
    try {
      dispatch(actProducts());
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  }, [dispatch]);

  return (
    <div className="categoriesContent">
      <div className="category" onClick={showAllProducts}>
        الكل
      </div>
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
