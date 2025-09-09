import axios from "axios";

// Set your backend base URL (NOT including /auth/login)
const api = axios.create({
  baseURL: "http://localhost:8080/api", // just /api
});

// If using JWT token auth, add this interceptor
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token"); // or cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
