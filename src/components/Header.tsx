import { Page } from "@/App";
import Icon from "@/components/ui/icon";

type Props = {
  page: Page;
  setPage: (p: Page) => void;
  cartCount: number;
};

const NAV_ITEMS: { id: Page; label: string; emoji: string }[] = [
  { id: "categories", label: "Каталог", emoji: "📦" },
  { id: "promo", label: "Акции", emoji: "🏷️" },
  { id: "bonuses", label: "Бонусы", emoji: "⭐" },
  { id: "stores", label: "Магазины", emoji: "📍" },
];

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
              knk<span className="text-shop-red">amur</span>
            </span>
          </button>

          {/* Nav */}
          <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1 justify-center">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  page === item.id
                    ? "bg-shop-red text-white"
                    : "text-gray-500 hover:text-shop-red hover:bg-shop-red-soft"
                }`}
              >
                <span>{item.emoji}</span>
                <span className="hidden md:inline">{item.label}</span>
              </button>
            ))}
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
