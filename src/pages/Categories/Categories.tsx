import { useEffect, useState } from "react";
import Axiosinstance from "../../config/axiosInstanse";

export interface ICategory {
  name: string;
  image?: string;
}
const Categories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    Axiosinstance.get<ICategory[]>("/categories").then((res) =>
      setCategories(res.data)
    );
  }, []);
  return (
    <div>
      {categories.map((category) => (
        <div>{category.name}</div>
      ))}
    </div>
  );
};

export default Categories;
