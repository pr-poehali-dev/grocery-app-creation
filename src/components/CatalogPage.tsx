import { useState, useMemo } from "react";
import { Product, CartItem } from "@/App";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Icon from "@/components/ui/icon";

type Props = {
  addToCart: (p: Product) => void;
  cart: CartItem[];
};

const CatalogPage = ({ addToCart, cart }: Props) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "price_asc" | "price_desc" | "discount">("default");

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (sortBy === "price_asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "discount") list = list.filter((p) => p.oldPrice);
    return list;
  }, [activeCategory, search, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Search & Sort */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-shop-red transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-shop-red cursor-pointer"
        >
          <option value="default">По умолчанию</option>
          <option value="price_asc">Цена: по возрастанию</option>
          <option value="price_desc">Цена: по убыванию</option>
          <option value="discount">Только со скидкой</option>
        </select>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? "bg-shop-red text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:border-shop-red hover:text-shop-red"
            }`}
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Result count */}
      <p className="text-sm text-gray-500 mb-4">
        Найдено: <span className="font-semibold text-shop-dark">{filtered.length}</span> товаров
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg font-semibold text-shop-dark">Ничего не найдено</p>
          <p className="text-gray-500 text-sm mt-1">Попробуйте изменить запрос или категорию</p>
          <button
            onClick={() => { setSearch(""); setActiveCategory("all"); setSortBy("default"); }}
            className="mt-4 px-4 py-2 bg-shop-red text-white rounded-xl text-sm font-medium hover:bg-shop-red-light transition-colors"
          >
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className="animate-fade-in"
              style={{ animationDelay: `${Math.min(i * 0.04, 0.4)}s` }}
            >
              <ProductCard product={p} addToCart={addToCart} cart={cart} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
