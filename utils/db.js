// lib/api.js
import axios from "axios";

// ✅ Create an Axios instance with default settings
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api", // Change to your backend URL
  timeout: 10000, // 10s timeout
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Optional: send cookies if using authentication
});

// ✅ Add a response interceptor (optional, for error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
