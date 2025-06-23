import {create} from "zustand";
import axios from "../api/axios";
import { toast } from "sonner";

const API_URL = "/api/v1/auth"; // Adjust if your endpoint differs

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,
  success:false,
  isAuthenticated: false,

  setUser: (user) => set({ user }),

  login: async ({ email, password }) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
       if(!res.data.success){
        toast.error(res.data.message);
        return null;
      }
      set({ user: res.data.user, loading: false ,success:true});
      console.log(res.data)
      toast.success("Login successful");
      return res.data;
    } catch (err) {
      set({ error: err.response?.data?.message || "Login failed", loading: false });
      toast.error(err.response?.data?.message || "Login failed");
      return null;
    }
  },

 register: async ({ username, email, password, confirmedPassword, isApproveToPolicy }) => {
  set({ loading: true, error: null });
  try {
    const res = await axios.post(
      `${API_URL}/register`,
      { username, email, password, confirmedPassword, isApproveToPolicy },
      { withCredentials: true }
    );

    set({ user: res.data.user, loading: false, success: true });
    toast.success("Account created successfully");
    return res.data;

  } catch (err) {
    console.log(err)
    const message = err?.response?.data?.message  || "Registration failed";
    toast.error(message);
    set({ error: message, loading: false });
    return null;
  }
}
,

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      set({ user: null, loading: false ,success:true });
      toast.success("Logout successful");
    } catch (err) {
      set({ error: err.response?.data?.message || "Logout failed", loading: false });
      toast.error(err.response?.data?.message || "Logout failed");
    }
  },

  authCheck: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/authCheck`, { withCredentials: true });
      set({ user: res.data.user, loading: false ,success:true, isAuthenticated: true });
      return res.data.user;
    } catch {
      set({ user: null, loading: false });
      return null;
    }
  },
  forgotPassword: async (email) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/forgot-password`, { email });
      console.log(res);
      set({ loading: false });
      return res;
    } catch (err) {
      console.log(err);
      set({ error: err.response?.data?.message || "Failed to send reset email", loading: false });
      return null;
    }
  },

  // Add reset password route
  resetPassword: async ({ token, password }) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/reset-password/${token}`, { password });
      set({ loading: false });
      return res.data;
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to reset password", loading: false });
      return null;
    }
  },
}));

export default useAuthStore;