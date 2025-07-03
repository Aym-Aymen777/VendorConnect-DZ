import { useState, useEffect } from "react";
import useUserStore from "../store/UserStore";
import { toast } from "sonner";

const useLikeProduct = (productId) => {
  const { likedProducts, likeThisProduct } = useUserStore();
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if the product is already liked (on mount or productId change)
  useEffect(() => {
    setLiked(likedProducts?.includes(productId));
  }, [likedProducts, productId]);

  const handleLike = async () => {
    setLoading(true);
    try {
      await likeThisProduct(productId);
      setLiked((prev) => !prev); // Toggle local state
    } catch (error) {
      console.error("Error liking product:", error);
      toast.error(error.response?.data?.message || "Failed to like product");
    } finally {
      setLoading(false);
    }
  };

  return { liked, loading, handleLike };
};

export default useLikeProduct;
