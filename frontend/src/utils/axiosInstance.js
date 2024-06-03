import axios from "axios";

const defaultConfig = {
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

// Create instance
let axiosInstance = axios.create(defaultConfig);

// axiosInstance.interceptors.request.use(function (config) {
//   const token = localStorage.getItem("token");
//   config.headers.Authorization = token ? `Bearer ${token}` : "";
//   return config;
// });
export { axiosInstance };
