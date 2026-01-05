import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// ✅ EXPORT AuthContext
export const AuthContext = createContext();

// Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getMe();
    } else {
      setLoading(false);
    }
  }, []);

  const register = async (formData) => {
    const res = await API.post("/auth/register", formData);
    if (res.data.success) {
      localStorage.setItem("token", res.data.data.token);
      setUser(res.data.data.user);
    }
    return res.data;
  };

  const login = async (formData) => {
    const res = await API.post("/auth/login", formData);
    if (res.data.success) {
      localStorage.setItem("token", res.data.data.token);
      setUser(res.data.data.user);
    }
    return res.data;
  };

  const getMe = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data.data.user);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        register,
        login,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
