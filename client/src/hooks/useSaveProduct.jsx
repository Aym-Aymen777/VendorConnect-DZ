import { useState, useEffect } from "react";
import useUserStore from "../store/UserStore";
import { toast } from "sonner";

const useCartProduct = (productId) => {
  const { cartProducts, saveThisProduct} = useUserStore();
  const [inCart, setInCart] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync local state with global Zustand store
  useEffect(() => {
    setInCart(cartProducts?.includes(productId));
  }, [cartProducts, productId]);

  const handleCartToggle = async () => {
    setLoading(true);
    try {
      await saveThisProduct(productId);
      setInCart((prev) => !prev); // Toggle local state
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error(error.response?.data?.message || "Failed to update cart");
    } finally {
      setLoading(false);
    }
  };

  return { inCart, loading, handleCartToggle };
};

export default useCartProduct;
