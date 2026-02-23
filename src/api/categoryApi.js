import axios from "axios";

const API = axios.create({
  baseURL: "https://jagadamba-backend.vercel.app/api",
});

export const fetchCategories = async () => {
  const res = await API.get("/categories");
  return res.data.data.categories;
};

export const fetchCategoryById = async (id) => {
  const res = await API.get(`/categories/${id}`);
  return res.data.data.category;
};
