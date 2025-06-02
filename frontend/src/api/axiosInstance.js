import axios from "axios";
import { getToken } from "../utils/token";
import { TOKEN_KEY } from "../constants/token";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/", // Base URL for your API
  timeout: 10000, // Optional: Set a timeout for requests
  headers: {
    // authorization
    Authorization: `Bearer ${getToken() || ""}`, // Include token from localStorage if available
  },
});

export default axiosInstance;
