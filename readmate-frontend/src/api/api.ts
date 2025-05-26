import axios from "axios";
import { API_BASE_URL } from "../lib/constants";
import { UserService } from "./services/userService";

export const booksApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

booksApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        await UserService.logout();
      } catch (logoutError) {
        console.error("Logout API call failed:", logoutError);
      }
      window.location.href = "/login?sessionExpired=1";
    }
    return Promise.reject(error);
  }
);
