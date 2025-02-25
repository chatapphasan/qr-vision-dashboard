
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Auth endpoints
export const login = async (username: string, password: string) => {
  const response = await api.post("/auth/login/", { username, password });
  localStorage.setItem("authToken", response.data.token);
  return response.data;
};

export const signup = async (username: string, email: string, password: string) => {
  const response = await api.post("/auth/register/", {
    username,
    email,
    password,
  });
  localStorage.setItem("authToken", response.data.token);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("authToken");
};

// Dashboard data endpoints
export const getDashboardData = async () => {
  const response = await api.get("/dashboard/");
  return response.data;
};

export default api;
