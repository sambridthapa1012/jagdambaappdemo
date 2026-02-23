import axios from "axios";

const API = axios.create({
  baseURL: "https://jagadamba-backend.vercel.app/api",
});

export const fetchProducts = async (params = {}) => {
  const res = await API.get("/products", { params });
  return res.data.data.products;
};

export const fetchProductById = async (id) => {
  const res = await API.get(`/products/${id}`);
  return res.data.data.product;
};
