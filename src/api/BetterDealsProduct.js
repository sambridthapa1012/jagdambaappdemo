import axios from "axios";

const API = axios.create({

  baseURL: "https://jagadamba-backend.vercel.app/api",
//  baseURL: "http://localhost:5000/api",
});

export const getBestDealProduct = async () => {
  const res = await API.get("/products", {
    params: {
      bestdeals: true,
      limit: 10,
    },
  });
  return res.data.data.products;
};
