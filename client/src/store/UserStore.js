import {create} from "zustand"; 
import axios from "../api/axios"; 
import { toast } from "sonner";    

const API_URL = "/api/v1/user";  

const useUserStore = create((set) => ({   
  user: null,   
  setUser: (user) => set({ user }),   
  clearUser: () => set({ user: null }),   
  
  updateUser: async (user) => {     
    try {       
      const response = await axios.put(`${API_URL}/update`, user, {         
        withCredentials: true,         
        headers: {           
          "Content-Type": "application/json",         
        }       
      });       
      set({ user: response.data.user });       
      toast.success("User updated successfully");       
      return response.data.user;     
    } catch (error) {       
      console.error("Error updating user:", error);       
      toast.error(error.response?.data?.message||"Failed to update user");       
      return null;     
    }   
  },    
  
  getOrders: async () => {     
    try {       
      const response = await axios.get("/api/v1/quotation/quotations", {         
        withCredentials: true,       
      });       
      return response?.data;     
    } catch (error) {       
      console.error("Error fetching orders:", error);       
      toast.error(error.response?.data?.message||"Failed to fetch orders");       
      return [];     
    }   
  },   
  
  getProducts: async () => {
    try {
      const response = await axios.get("/api/v1/product/my-products", {
        withCredentials: true,
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.response?.data?.message || "Failed to fetch products");
      return [];
    }
  },
}));  

export default useUserStore;