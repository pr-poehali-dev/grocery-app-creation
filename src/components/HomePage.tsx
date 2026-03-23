import { useState } from "react";
import { Page, Product, CartItem } from "@/App";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Icon from "@/components/ui/icon";

type Props = {
  setPage: (p: Page) => void;
  addToCart: (p: Product) => void;
  cart: CartItem[];
  goToCategory: (catId: string) => void;
};

const banners = [
  {
    id: 1,
    title: "Свежие овощи и фрукты",
    subtitle: "Прямо с грядки — доставка от 40 минут",
    bg: "from-shop-green to-emerald-600",
    emoji: "🥦",
    badge: "Новинки",
  },
  {
    id: 2,
    title: "Скидки до 40% на молочное",
    subtitle: "Только до конца недели",
    bg: "from-shop-red to-red-700",
    emoji: "🧀",
    badge: "Акция",
  },
  {
    id: 3,
    title: "Выпечка каждое утро",
    subtitle: "Свежий хлеб — с 7:00",
    bg: "from-amber-500 to-orange-600",
    emoji: "🍞",
    badge: "Горячее",
  },
];

const HomePage = ({ setPage, addToCart, cart, goToCategory }: Props) => {
  const [activeBanner, setActiveBanner] = useState(0);
  const popular = PRODUCTS.filter((p) => p.popular);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      {/* Delivery badge */}
      <div className="flex items-center gap-2 bg-shop-green text-white px-4 py-2 rounded-2xl w-fit animate-fade-in shadow-sm">
        <Icon name="Zap" size={16} />
        <span className="text-sm font-bold">Доставка от 40 минут</span>
        <span className="text-white/70 text-sm">•</span>
        <span className="text-sm text-white/90">по Комсомольску-на-Амуре</span>
      </div>

      {/* Hero Banner */}
      <section>
        <div
          className={`relative rounded-3xl bg-gradient-to-r ${banners[activeBanner].bg} text-white p-8 md:p-12 overflow-hidden animate-fade-in`}
        >
          <div className="relative z-10 max-w-lg">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-3">
              {banners[activeBanner].badge}
            </span>
            <h1 className="text-2xl md:text-4xl font-bold mb-2 leading-tight">
              {banners[activeBanner].title}
            </h1>
            <p className="text-white/80 text-sm md:text-base mb-6">
              {banners[activeBanner].subtitle}
            </p>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setPage("catalog")}
                className="bg-white text-shop-dark px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-all"
              >
                Смотреть товары
              </button>
              <button
                onClick={() => setPage("stores")}
                className="bg-white/20 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/30 transition-all flex items-center gap-1.5"
              >
                <Icon name="MapPin" size={16} />
                Выбрать магазин
              </button>
            </div>
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-8xl md:text-9xl opacity-30 select-none">
            {banners[activeBanner].emoji}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-3">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveBanner(i)}
              className={`h-2 rounded-full transition-all ${
                i === activeBanner
                  ? "w-8 bg-shop-red"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-4 gap-3">
        {[
          { value: "40 мин", label: "доставка", color: "text-shop-green", emoji: "⚡" },
          { value: "2 000+", label: "товаров", color: "text-shop-red", emoji: "📦" },
          { value: "4", label: "магазина", color: "text-shop-dark", emoji: "🏪" },
          { value: "15 мин", label: "сборка", color: "text-shop-red", emoji: "🛒" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 text-center border border-gray-100">
            <div className="text-lg mb-0.5">{s.emoji}</div>
            <div className={`text-base font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Category shortcuts */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-shop-dark">Категории</h2>
          <button
            onClick={() => setPage("categories")}
            className="flex items-center gap-1 text-sm text-shop-red font-medium hover:gap-2 transition-all"
          >
            Все категории
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          {CATEGORIES.slice(1).map((cat) => (
            <button
              key={cat.id}
              onClick={() => goToCategory(cat.id)}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white border border-gray-100 hover:border-shop-red hover:shadow-md transition-all group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {cat.emoji}
              </span>
              <span className="text-xs font-medium text-gray-600 group-hover:text-shop-red">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Popular products */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-shop-dark">Популярное</h2>
          <button
            onClick={() => setPage("catalog")}
            className="flex items-center gap-1 text-sm text-shop-red font-medium hover:gap-2 transition-all"
          >
            Все товары
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {popular.map((p, i) => (
            <div
              key={p.id}
              className="animate-fade-in"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <ProductCard product={p} addToCart={addToCart} cart={cart} />
            </div>
          ))}
        </div>
      </section>

      {/* Bonus banner */}
      <section className="grid sm:grid-cols-2 gap-4">
        <div
          className="rounded-3xl bg-gradient-to-br from-shop-dark to-gray-800 text-white p-6 flex items-center justify-between cursor-pointer hover:shadow-lg transition-all"
          onClick={() => setPage("bonuses")}
        >
          <div>
            <div className="text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Бонусная карта</div>
            <div className="text-lg font-bold">840 бонусов</div>
            <div className="text-sm text-white/60 mt-1">5% кэшбэк с каждого заказа</div>
          </div>
          <div className="text-4xl">⭐</div>
        </div>

        <div
          className="rounded-3xl bg-shop-red-soft border border-red-100 p-6 flex items-center justify-between cursor-pointer hover:shadow-md transition-all"
          onClick={() => setPage("promo")}
        >
          <div>
            <div className="text-xs font-semibold text-shop-red mb-1 uppercase tracking-wider">Промокод</div>
            <div className="text-lg font-bold text-shop-dark">Скидка 10%</div>
            <div className="text-sm text-gray-500 mt-1">
              на первый заказ: <span className="font-bold text-shop-red">KNK10</span>
            </div>
          </div>
          <div className="text-4xl">🎁</div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;