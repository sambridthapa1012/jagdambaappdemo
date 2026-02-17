import axios from "axios";

const API = axios.create({
  baseURL: "https://jagdamba-website-backend.vercel.app/api",
});

export const getBestSellingProducts = async () => {
  const res = await API.get("/products", {
    params: {
      featured: true,
      limit: 10,
    },
  });
  return res.data.data.products;
};
