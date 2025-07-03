import { create } from "zustand";
import axios from "../api/axios";
import { toast } from "sonner";

const API_URL = "/api/v1/user";

const useUserStore = create((set) => ({
  user: null,
  isLoading: false,
  likedProducts: [],
  cartProducts: [],
  chats:[],
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
      set({ isLoading: false, user: response.data.user });
      toast.success("Product added successfully");
      return response.data.product;
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.response?.data?.message || "Failed to add product");
      set({ isLoading: false });
      return null;
    }
  },

  getMarketPlaceProducts: async () => {
    try {
      const res = await axios.get("/api/v1/product/all", {
        withCredentials: true,
      });
      return res?.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "error fetching products");
    }
  },

  createQuotation: async (quotationData) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(
        `api/v1/quotation/create`,
        quotationData,
        {
          withCredentials: true,
        }
      );
      set({ isLoading: false, user: response.data.user });
      toast.success(
        "Order sent to seller successfully , please wait for confirmation"
      );
      return response.data.quotation;
    } catch (error) {
      console.error("Error creating quotation:", error);
      toast.error(
        error.response?.data?.message || "Failed to create quotation"
      );
      set({ isLoading: false });
      return null;
    }
  },

  saveThisProduct: async (productId) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(
        `api/v1/product/add-to-cart`,
        { productId },
        {
          withCredentials: true,
        }
      );
      set({ isLoading: false, user: response.data.user });
      if (response.data.message.includes("removed")){
        toast.error("Product removed from cart");
      }else{
        toast.success("Product added to cart");
      }
      return response.data.user;
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error(
        error.response?.data?.message || "Failed to add product to cart"
      );
      set({ isLoading: false });
      return null;
    }
  },

  likeThisProduct: async (productId) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(
        `api/v1/product/add-to-wishlist`,
        { productId },
        {
          withCredentials: true,
        }
      );
      set({ isLoading: false, user: response.data.user });
      if (response.data.message.includes("removed")){
        toast.error("Product removed from wishlist");
      }else{
        toast.success("Product added to wishlist");
      }
      return response.data.user;
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      toast.error(
        error.response?.data?.message || "Failed to add product to wishlist"
      );
      set({ isLoading: false });
      return null;
    }
  },

  listMyCartAndWishlist: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`api/v1/product/cartOrWishlist`, {
        withCredentials: true,
      });
      set({
        isLoading: false,
        cartProducts: response.data.cartProducts,
        likedProducts: response.data.wishlistProducts,
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching cart and wishlist products:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch cart and wishlist products"
      );
      set({ isLoading: false });
      return [];
    }
  },

  getUserChats: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`api/v1/chat/my-chats`, {
        withCredentials: true,
      });
      set({ isLoading: false , chats: response.data.chats});
      return response?.data;
    } catch (error) {
      console.error("Error fetching user chats:", error);
      toast.error(error.response?.data?.message || "Failed to fetch user chats");
      set({ isLoading: false });
      return [];
    }
  },

  getChatMessages: async (chatId) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`api/v1/chat/${chatId}`, {
        withCredentials: true,
      });
      set({ isLoading: false });
      return response?.data;
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      toast.error(error.response?.data?.message || "Failed to fetch chat messages");
      set({ isLoading: false });
      return [];
    }
  },

  sendMessage: async ( chatId, messageData) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(`api/v1/chat/send/${chatId}`, messageData, {
        withCredentials: true,
      });
      set({ isLoading: false });
      return response?.data;
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.response?.data?.message || "Failed to send message");
      set({ isLoading: false });
      return null;
    }
  },

  startNewChat: async (participants) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(`api/v1/chat/start`,  participants , {
        withCredentials: true,
      });
      set({ isLoading: false });
      return response?.data.chat;
    } catch (error) {
      console.error("Error starting new chat:", error);
      toast.error(error.response?.data?.message || "Failed to start new chat");
      set({ isLoading: false });
      return null;
    }
  },





}));

export default useUserStore;
