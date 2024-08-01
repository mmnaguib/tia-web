import axios from "axios";
import { useEffect, useState } from "react";

export interface ICategory {
  name: string;
  image?: string;
}
const Categories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    axios
      .get<ICategory[]>("http://localhost:3005/categories")
      .then((res) => setCategories(res.data));
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
