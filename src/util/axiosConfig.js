import axios from "axios";
import { BASE_URL } from "./apiEndPoints";

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const excludeEndPoints = [
  "/login",
  "/register",
  "/status",
  "/activate",
  "/health",
];

axiosConfig.interceptors.request.use(
  (config) => {
    const shouldSkipToken = excludeEndPoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (!shouldSkipToken) {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    console.log("AXIOS ERROR →", status, message);
    if (status === 401 && message === "Invalid token") {
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosConfig;
