import { Page } from "@/App";
import Icon from "@/components/ui/icon";
import { CATEGORIES } from "@/data/products";

type Props = {
  page: Page;
  setPage: (p: Page) => void;
  cartCount: number;
};

const navCategories = CATEGORIES.slice(1, 7);

const Header = ({ page, setPage, cartCount }: Props) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-[72px] gap-4">
          {/* Logo */}
          <button
            onClick={() => setPage("home")}
            className="flex items-center gap-2 shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-shop-red flex items-center justify-center">
              <span className="text-white text-lg">🥬</span>
            </div>
            <span className="font-bold text-lg text-shop-dark tracking-tight hidden sm:block">
              Фреш<span className="text-shop-red">Маркет</span>
            </span>
          </button>

          {/* Category tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1 justify-center">
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setPage("catalog")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-500 hover:text-shop-red hover:bg-shop-red-soft transition-all whitespace-nowrap"
              >
                <span>{cat.emoji}</span>
                <span className="hidden md:inline">{cat.label}</span>
              </button>
            ))}
            <button
              onClick={() => setPage("promo")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-shop-red bg-shop-red-soft hover:bg-red-100 transition-all whitespace-nowrap"
            >
              <span>🏷️</span>
              <span className="hidden md:inline">Акции</span>
            </button>
          </nav>

          {/* Right buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setPage("profile")}
              className={`p-2 rounded-xl transition-all ${
                page === "profile"
                  ? "bg-shop-green text-white"
                  : "text-gray-500 hover:bg-shop-green-soft hover:text-shop-green"
              }`}
            >
              <Icon name="User" size={22} />
            </button>

            <button
              onClick={() => setPage("cart")}
              className={`relative p-2 rounded-xl transition-all ${
                page === "cart"
                  ? "bg-shop-red text-white"
                  : "text-gray-500 hover:bg-shop-red-soft hover:text-shop-red"
              }`}
            >
              <Icon name="ShoppingCart" size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-shop-green text-white text-xs rounded-full flex items-center justify-center font-bold animate-scale-in">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
