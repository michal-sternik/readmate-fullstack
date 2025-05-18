import axios from "axios";
import { API_BASE_URL } from "../lib/constants";
// import type { InternalAxiosRequestConfig } from "axios";

export const booksApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// booksApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   const token = localStorage.getItem("token");
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
