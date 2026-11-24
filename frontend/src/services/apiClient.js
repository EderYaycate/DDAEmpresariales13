// The ONLY place where the base address of the API is written.
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8001/api",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export default apiClient;
