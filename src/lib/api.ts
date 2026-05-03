import axios from "axios";
import { serverApi } from "./config";

const api = axios.create({
  baseURL: serverApi,
  withCredentials: true,
});

export function imageUrl(path?: string | null): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${serverApi}/${path}`;
}

export default api;
