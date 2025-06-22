import ProductCard from "./ProductCard";

export default function ProductsFlexContainer({ items, onAddToCart, onToggleFavorite, favorites }) {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 flex-wrap justify-center md:justify-start md:align-start align-center">
      {items.map((item) => (
        <ProductCard
          key={item.id}
          item={item}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.includes(item.id)}
        />
      ))}
    </div>
  );
}