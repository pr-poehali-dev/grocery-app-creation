import { CartItem, Page } from "@/App";
import Icon from "@/components/ui/icon";

type Props = {
  cart: CartItem[];
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  cartTotal: number;
  setPage: (p: Page) => void;
};

const CartPage = ({ cart, removeFromCart, updateQuantity, cartTotal, setPage }: Props) => {
  const deliveryCost = cartTotal >= 1500 ? 0 : 199;
  const finalTotal = cartTotal + deliveryCost;

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="text-7xl mb-6">🛒</div>
        <h2 className="text-2xl font-bold text-shop-dark mb-2">Корзина пуста</h2>
        <p className="text-gray-500 mb-6">Добавьте товары из каталога</p>
        <button
          onClick={() => setPage("catalog")}
          className="px-6 py-3 bg-shop-red text-white rounded-xl font-semibold hover:bg-shop-red-light transition-colors"
        >
          Перейти в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-shop-dark mb-6">
        Корзина <span className="text-gray-400 font-normal text-lg">({cart.length} {cart.length === 1 ? "товар" : "товара"})</span>
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Items */}
        <div className="md:col-span-2 space-y-3">
          {cart.map((item, i) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-100 animate-fade-in"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-shop-dark text-sm leading-tight truncate">{item.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.unit}</p>
                <p className="font-bold text-shop-red mt-1">{item.price} ₽</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-shop-red-soft flex items-center justify-center text-gray-600 hover:text-shop-red transition-colors"
                >
                  <Icon name="Minus" size={14} />
                </button>
                <span className="w-6 text-center font-bold text-shop-dark">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-shop-green-soft flex items-center justify-center text-gray-600 hover:text-shop-green transition-colors"
                >
                  <Icon name="Plus" size={14} />
                </button>
              </div>

              <div className="text-right shrink-0 min-w-[60px]">
                <p className="font-bold text-shop-dark">{item.price * item.quantity} ₽</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-300 hover:text-shop-red transition-colors mt-1"
                >
                  <Icon name="Trash2" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="font-bold text-shop-dark mb-4">Итого</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Товары</span>
                <span>{cartTotal} ₽</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Доставка</span>
                <span className={deliveryCost === 0 ? "text-shop-green font-semibold" : ""}>
                  {deliveryCost === 0 ? "Бесплатно" : `${deliveryCost} ₽`}
                </span>
              </div>
            </div>

            {deliveryCost > 0 && (
              <div className="mt-3 p-2.5 bg-shop-green-soft rounded-xl text-xs text-shop-green font-medium">
                До бесплатной доставки: {1500 - cartTotal} ₽
              </div>
            )}

            <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between font-bold text-shop-dark">
              <span>К оплате</span>
              <span className="text-shop-red text-lg">{finalTotal} ₽</span>
            </div>

            {/* Promo */}
            <div className="mt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Промокод"
                  className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-shop-red"
                />
                <button className="px-3 py-2 bg-shop-green-soft text-shop-green rounded-xl text-sm font-semibold hover:bg-green-100 transition-colors">
                  Применить
                </button>
              </div>
            </div>

            <button
              onClick={() => setPage("delivery")}
              className="w-full mt-4 py-3 bg-shop-red text-white rounded-xl font-bold hover:bg-shop-red-light transition-colors"
            >
              Оформить заказ
            </button>
          </div>

          <button
            onClick={() => setPage("catalog")}
            className="w-full py-2.5 border border-gray-200 rounded-xl text-sm text-gray-500 hover:text-shop-red hover:border-shop-red transition-colors font-medium"
          >
            Продолжить покупки
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;