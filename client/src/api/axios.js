import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // if using cookies/auth
   headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default API;
