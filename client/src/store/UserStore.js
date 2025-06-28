import { create } from "zustand";
import axios from "../api/axios";
import { toast } from "sonner";

const API_URL = "/api/v1/user";

const useUserStore = create((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  updateUser: async (user) => {
    try {
      set({ isLoading: true });
      const response = await axios.put(`${API_URL}/update`, user, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      set({ user: response.data.user, isLoading: false });
      toast.success("User updated successfully");
      return response.data.user;
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.response?.data?.message || "Failed to update user");
      set({ isLoading: false });
      return null;
    }
  },

  getOrders: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get("/api/v1/quotation/quotations", {
        withCredentials: true,
      });
      set({ isLoading: false });
      return response?.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error.response?.data?.message || "Failed to fetch orders");
      set({ isLoading: false });
      return [];
    }
  },

  getProducts: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get("/api/v1/product/my-products", {
        withCredentials: true,
      });
      set({ isLoading: false });
      return response?.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.response?.data?.message || "Failed to fetch products");
      set({ isLoading: false });
      return [];
    }
  },

  updateUserStore: async (storeData) => {
    try {
      set({ isLoading: true });

      // Create FormData for file uploads
      const formData = new FormData();

      // Append text fields
      const textFields = [
        "companyName",
        "businessType",
        "industry",
        "description",
        "address",
        "city",
        "country",
        "phone",
        "website",
        "locationMap",
      ];

      textFields.forEach((field) => {
        if (storeData[field] !== undefined && storeData[field] !== null) {
          formData.append(field, storeData[field]);
        }
      });

      // Handle social links (convert array to JSON string)
      if (storeData.socialLinks) {
        formData.append("socialLinks", JSON.stringify(storeData.socialLinks));
      }

      // Handle file uploads
      if (storeData.logoFile && storeData.logoFile instanceof File) {
        formData.append("logo", storeData.logoFile);
      }

      if (
        storeData.coverImageFile &&
        storeData.coverImageFile instanceof File
      ) {
        formData.append("coverImage", storeData.coverImageFile);
      }

      if (
        storeData.profileVideoFile &&
        storeData.profileVideoFile instanceof File
      ) {
        formData.append("profileVideo", storeData.profileVideoFile);
      }

      // Handle gallery files
      if (storeData.galleryFiles && Array.isArray(storeData.galleryFiles)) {
        storeData.galleryFiles.forEach((file) => {
          if (file instanceof File) {
            formData.append("gallery", file);
          }
        });
      }

      // Handle gallery image removal (if any images need to be removed)
      if (
        storeData.removeGalleryImages &&
        Array.isArray(storeData.removeGalleryImages)
      ) {
        formData.append(
          "removeGalleryImages",
          JSON.stringify(storeData.removeGalleryImages)
        );
      }

      const response = await axios.put(
        `${API_URL}/update-user-store`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          // Add progress tracking if needed
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`Upload Progress: ${percentCompleted}%`);
            // You can add a progress state here if needed
          },
        }
      );

      set({ user: response.data.user, isLoading: false });
      toast.success("Store updated successfully");
      return response.data.user;
    } catch (error) {
      console.error("Error updating user store:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update store";
      toast.error(errorMessage);
      set({ isLoading: false });
      return null;
    }
  },

  // Additional helper function to delete specific gallery image
  deleteGalleryImage: async (imageUrl) => {
    try {
      set({ isLoading: true });

      const response = await axios.delete(`${API_URL}/delete-gallery-image`, {
        data: { imageUrl },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      set({ user: response.data.user, isLoading: false });
      toast.success("Gallery image deleted successfully");
      return response.data.gallery;
    } catch (error) {
      console.error("Error deleting gallery image:", error);
      toast.error(error.response?.data?.message || "Failed to delete image");
      set({ isLoading: false });
      return null;
    }
  },

  // Additional helper function to clear entire gallery
  clearGallery: async () => {
    try {
      set({ isLoading: true });

      const response = await axios.delete(`${API_URL}/clear-gallery`, {
        withCredentials: true,
      });

      set({ user: response.data.user, isLoading: false });
      toast.success("Gallery cleared successfully");
      return response.data.gallery;
    } catch (error) {
      console.error("Error clearing gallery:", error);
      toast.error(error.response?.data?.message || "Failed to clear gallery");
      set({ isLoading: false });
      return null;
    }
  },
  

  addProduct: async (productData) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(`api/v1/product/add`, productData, {
        withCredentials: true,
      });
      set({ isLoading: false , user: response.data.user});
      toast.success("Product added successfully");
      return response.data.product;
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.response?.data?.message || "Failed to add product");
      set({ isLoading: false });
      return null;
    }
  },

  

}));

export default useUserStore;
