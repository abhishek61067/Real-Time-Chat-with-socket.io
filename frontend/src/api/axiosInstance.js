import axios from "axios";
import { getToken } from "../utils/token";
import { TOKEN_KEY } from "../constants/token";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/",
  baseURL: "https://real-time-chat-with-socket-io.onrender.com",
  timeout: 10000,
});

// Always get the latest token before each request
axiosInstance.interceptors.request.use((config) => {
  const token = getToken(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
