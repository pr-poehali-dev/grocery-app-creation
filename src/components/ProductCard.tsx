import { Product, CartItem } from "@/App";
import Icon from "@/components/ui/icon";

type Props = {
  product: Product;
  addToCart: (p: Product) => void;
  cart: CartItem[];
};

const ProductCard = ({ product, addToCart, cart }: Props) => {
  const inCart = cart.find((i) => i.id === product.id);
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return (
    <div className="bg-white rounded-2xl overflow-hidden hover-scale group cursor-pointer border border-gray-100">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <span
            className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-xs font-bold text-white ${
              product.badge === "Акция" ? "bg-shop-red" : "bg-shop-green"
            }`}
          >
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-xs font-bold bg-shop-red text-white">
            -{discount}%
          </span>
        )}
      </div>

      <div className="p-3">
        <p className="text-xs text-gray-400 mb-0.5">{product.unit}</p>
        <h3 className="font-semibold text-shop-dark text-sm leading-tight mb-2 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-shop-dark text-base">
              {product.price} ₽
            </span>
            {product.oldPrice && (
              <span className="ml-1.5 text-xs text-gray-400 line-through">
                {product.oldPrice} ₽
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${
              inCart
                ? "bg-shop-green text-white"
                : "bg-shop-red text-white hover:bg-shop-red-light"
            }`}
          >
            {inCart ? (
              <>
                <Icon name="Check" size={14} />
                <span>{inCart.quantity}</span>
              </>
            ) : (
              <Icon name="Plus" size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
