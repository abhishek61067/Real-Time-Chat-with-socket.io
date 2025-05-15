import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/", // Base URL for your API
  timeout: 10000, // Optional: Set a timeout for requests
});

export default axiosInstance;
