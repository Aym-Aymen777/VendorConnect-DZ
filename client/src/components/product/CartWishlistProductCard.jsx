import useCartProduct from "../../hooks/useSaveProduct";
import useLikeProduct from "../../hooks/useLikeProduct";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, HeartOff } from "lucide-react";

const CartWishlistProductCard = ({ product, Type }) => {
  const { handleLike } = useLikeProduct(product._id);
  const { handleCartToggle } = useCartProduct(product._id);
  const navigate = useNavigate();

  if (Type === "cart") {
    return (
      <div className="bg-white rounded-xl shadow p-4 flex flex-col">
        <img
          src={product.media[0]?.url}
          alt={product.title}
          className="w-full h-32 lg:h-40 object-cover rounded-lg mb-3"
        />
        <h4 className="font-semibold text-[#1f3b73] mb-2 flex-1">
          {product.title}
        </h4>
        <p className="text-[#e1a95f] font-bold text-lg mb-3">
          {product.flashDeals?.isActive
            ? product.flashDeals.discountPrice
            : product.price}{" "}
          DZD
        </p>
        <div className="flex gap-2">
          <Link to={`/product/${product._id}`} className="w-fit">
            <button className="flex-1 px-3 py-2 bg-[#e1a95f] text-white rounded-lg text-sm font-medium hover:bg-[#d89a4b] transition">
              View
            </button>
          </Link>
          <button
            onClick={() => {
              handleCartToggle(product._id);
              navigate("/profile");
            }}
            className="px-3 py-2 bg-[#e1a95fc8]  rounded-lg text-sm font-medium hover:bg-[#d89a4bc8] transition">
            <Trash2 size={16} className="text-[#1f3b73]" />
          </button>
        </div>
      </div>
    );
  }

  if (Type === "wishlist") {
    return (
      <div className="bg-white rounded-xl shadow p-4 flex flex-col">
        <img
          src={product.media[0]?.url}
          alt={product.title}
          className="w-full h-32 lg:h-40 object-cover rounded-lg mb-3"
        />
        <h4 className="font-semibold text-[#1f3b73] mb-2 flex-1">
          {product.title}
        </h4>
        <p className="text-[#e1a95f] font-bold text-lg mb-3">
          {product.flashDeals?.isActive
            ? product.flashDeals.discountPrice
            : product.price}{" "}
          DZD
        </p>
        <div className="flex gap-2">
          <Link to={`/product/${product._id}`} className="w-fit">
            <button className="flex-1 px-3 py-2 bg-[#e1a95f] text-white rounded-lg text-sm font-medium hover:bg-[#d89a4b] transition">
              View
            </button>
          </Link>
          <button
            onClick={() => {
              handleLike();
              navigate("/profile");
            }}
            className={`px-3 py-2 bg-red-100
            } rounded-lg text-sm font-medium hover:bg-red-200 transition`}>
            <HeartOff size={16} />
          </button>
        </div>
      </div>
    );
  }
 
};

export default CartWishlistProductCard;
