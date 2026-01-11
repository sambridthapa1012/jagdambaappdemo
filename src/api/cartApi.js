import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getCart = async () => {
  const res = await API.get("/cart");
  return res.data.data.cart;
};

export const addToCart = async (productId, quantity = 1) => {
  const res = await API.post("/cart/items", { productId, quantity });
  return res.data.data.cart;
};

export const updateCartItem = async (itemId, quantity) => {
  const res = await API.put(`/cart/items/${itemId}`, { quantity });
  return res.data.data.cart;
};

export const removeCartItem = async (itemId) => {
  const res = await API.delete(`/cart/items/${itemId}`);
  return res.data.data.cart;
};

export const clearCart = async () => {
  const res = await API.delete("/cart");
  return res.data.data.cart;
};
