import { createContext, useContext, useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";
import { fetchCategories } from "../api/categoryApi";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const productsData = await fetchProducts(); // fetch all products
        setProducts(productsData);

        const categoriesData = await fetchCategories(); // fetch all categories
        setCategories(categoriesData);
      } catch (err) {
        console.error("Failed to load products or categories:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <ProductContext.Provider value={{ products, categories, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
