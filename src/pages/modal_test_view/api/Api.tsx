import axios, { AxiosInstance } from "axios";
const token = localStorage.getItem("accessToken");
export const ApiMenu: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,

  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  },
});
