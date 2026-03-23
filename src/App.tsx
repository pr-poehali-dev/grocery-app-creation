import { useState } from "react";
import Header from "@/components/Header";
import HomePage from "@/components/HomePage";
import CatalogPage from "@/components/CatalogPage";
import CategoriesPage from "@/components/CategoriesPage";
import CartPage from "@/components/CartPage";
import ProfilePage from "@/components/ProfilePage";
import PromoPage from "@/components/PromoPage";
import DeliveryPage from "@/components/DeliveryPage";
import BonusPage from "@/components/BonusPage";
import StoresPage from "@/components/StoresPage";
import GamePage from "@/components/GamePage";
import AiAssistant from "@/components/AiAssistant";

export type Page =
  | "home"
  | "catalog"
  | "categories"
  | "cart"
  | "profile"
  | "promo"
  | "delivery"
  | "bonuses"
  | "stores"
  | "game";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  unit: string;
  quantity: number;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  unit: string;
  badge?: string;
  popular?: boolean;
};

const App = () => {
  const [page, setPage] = useState<Page>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [aiOpen, setAiOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: number, qty: number) => {
    if (qty <= 0) return removeFromCart(id);
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  const goToCategory = (catId: string) => {
    setSelectedCategory(catId);
    setPage("catalog");
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8F7F5] font-golos">
      <Header page={page} setPage={setPage} cartCount={cartCount} />

      <main className="pt-[72px]">
        {page === "home" && (
          <HomePage setPage={setPage} addToCart={addToCart} cart={cart} goToCategory={goToCategory} />
        )}
        {page === "categories" && (
          <CategoriesPage setPage={setPage} goToCategory={goToCategory} />
        )}
        {page === "catalog" && (
          <CatalogPage addToCart={addToCart} cart={cart} initialCategory={selectedCategory} />
        )}
        {page === "cart" && (
          <CartPage
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            cartTotal={cartTotal}
            setPage={setPage}
          />
        )}
        {page === "delivery" && (
          <DeliveryPage setPage={setPage} cartTotal={cartTotal} />
        )}
        {page === "bonuses" && <BonusPage />}
        {page === "stores" && <StoresPage />}
        {page === "game" && <GamePage setPage={setPage} />}
        {page === "profile" && <ProfilePage setPage={setPage} />}
        {page === "promo" && <PromoPage />}
      </main>

      {/* AI FAB — левый нижний угол */}
      <button
        onClick={() => setAiOpen(true)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-shop-red text-white shadow-lg flex items-center justify-center hover:bg-shop-red-light transition-all duration-200 hover:scale-110 hover:shadow-xl"
        title="ИИ-помощник"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"/>
          <circle cx="9" cy="11" r="1" fill="currentColor" stroke="none"/>
          <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none"/>
        </svg>
      </button>

      {aiOpen && <AiAssistant onClose={() => setAiOpen(false)} />}
    </div>
  );
};

export default App;
