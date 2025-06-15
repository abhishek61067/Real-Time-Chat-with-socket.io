import axios from "axios";
import { getToken } from "../utils/token";
import { TOKEN_KEY } from "../constants/token";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? import.meta.env.VITE_PRODUCTION_URL
      : import.meta.env.VITE_LOCAL_URL,
  timeout: 10000,
});

// Always get the latest token before each request
axiosInstance.interceptors.request.use((config) => {
  const userInfo = localStorage?.getItem("userInfo") ?? null;
  const token = userInfo && JSON.parse(userInfo)["token"];
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
