import { useState, useEffect } from "react";
import Axiosinstance from "../config/axiosInstanse";
import { IProduct } from "../interfaces";

const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axiosinstance.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return { products, setProducts };
};

export default useProducts;
