import { useState } from "react";
import { Eye, Heart, ShoppingCart, Zap, Star } from "lucide-react";
import { Link } from "react-router-dom";
import useUserStore from "../../store/UserStore";
import useCartProduct from "../../hooks/useSaveProduct";

export default function ProductCard({
  item,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const { createQuotation } = useUserStore();
  const {handleCartToggle}=useCartProduct(item._id);
  const now = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);
  const created = new Date(item.createdAt);
  const isNew = created >= oneWeekAgo && created <= now;

  const handleRequestProduct = async () => {
    try {
      const response = await createQuotation({
        product: item._id,
        message: orderMessage,
      });

      if (response) {
        setShowModal(false);
        setOrderMessage("");
      }
    } catch (error) {
      console.error("Error requesting product:", error);
    }
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 w-80 flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {/* Image Container */}
      <div className="relative overflow-hidden h-64">
        <img
          src={item.media[0]?.url}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />

        {/* Overlay with quick actions */}
        <div
          className={`absolute inset-0 bg-[#1f3b73]/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}>
          <Link
            to={`/product/${item._id}`}
            className="bg-white  rounded-full hover:bg-[#f4f2ed] transition-colors">
            <button className="bg-white p-3 rounded-full hover:bg-[#f4f2ed] transition-colors">
              <Eye size={20} className="text-[#1f3b73]" />
            </button>
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(item._id);
            }}
            className="bg-white p-3 rounded-full hover:bg-[#f4f2ed] transition-colors">
            <Heart
              size={20}
              className={
                isFavorite ? "text-red-500 fill-red-500" : "text-[#1f3b73]"
              }
            />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isNew && (
            <span className="bg-[#e1a95f] text-white px-3 py-1 rounded-full text-xs font-semibold">
              NEW
            </span>
          )}
          {item.flashDeals?.isActive && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
              <Zap size={12} className="inline mr-1" />
              FLASH
            </span>
          )}
          {item.flashDeals?.discount > 0 && (
            <span className="bg-[#1f3b73] text-white px-3 py-1 rounded-full text-xs font-semibold">
              -{item.flashDeals.discount}%
            </span>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(item._id);
          }}
          className="absolute top-3 right-3 bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
          <Heart
            size={16}
            className={
              isFavorite ? "text-red-500 fill-red-500" : "text-[#1f3b73]"
            }
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < Math.floor(item.rating)
                    ? "text-[#e1a95f] fill-[#e1a95f]"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {item.rating} ({item.views})
          </span>
        </div>

        <h3 className="font-bold text-lg text-[#1f3b73] mb-2 line-clamp-2">
          {item.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#1f3b73]">
              {item.flashDeals?.discountPrice || item.price} DZD
            </span>
            {item.flashDeals?.isActive && (
              <span className="text-sm text-gray-500 line-through">
                {item.price} DZD
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCartToggle();
            }}
            className="w-full bg-[#e1a95f] text-white font-semibold py-3  rounded-xl hover:bg-[#d89a4b] transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
            <ShoppingCart size={18} />
            Add to Cart
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(item._id);
              setShowModal(true);
            }}
            className="w-full bg-[#1f3b73] text-white font-semibold py-3 rounded-xl hover:bg-[#244587] transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
            <ShoppingCart size={18} />
            Buy Now
          </button>
        </div>
        {showModal && (
          <form
            onSubmit={handleRequestProduct}
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Buy Now</h2>
              <p className="mb-4">Are you sure you want to buy this product?</p>

              <label htmlFor="message" className="block mb-2 font-medium">
                Type your message:
              </label>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="5"
                value={orderMessage}
                onChange={(e) => setOrderMessage(e.target.value)}
                placeholder="Any specific instructions,preferences,or questions about your order?"
                className="border border-gray-300 rounded-md p-2 w-full mb-4"
                required></textarea>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-[#1f3b73cd] text-white py-2 px-4 rounded-lg mr-2">
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-[#e1a95f] text-white py-2 px-4 rounded-lg">
                  Buy Now
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
