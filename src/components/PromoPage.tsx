import { useState } from "react";
import Icon from "@/components/ui/icon";

const PROMOS = [
  { id: 1, code: "FRESH10", discount: "10%", desc: "На первый заказ", expires: "31 марта", minOrder: 500, used: false },
  { id: 2, code: "VEGGIE20", discount: "20%", desc: "На овощи и фрукты", expires: "25 марта", minOrder: 800, used: false },
  { id: 3, code: "DAIRY15", discount: "15%", desc: "На молочную продукцию", expires: "28 марта", minOrder: 600, used: true },
  { id: 4, code: "SPRING30", discount: "30%", desc: "Весенняя распродажа", expires: "1 апреля", minOrder: 1500, used: false },
];

const SALES = [
  { id: 1, title: "Молочная пятница", desc: "Скидка 25% на весь молочный отдел", emoji: "🥛", color: "bg-blue-50 border-blue-100", badge: "До 25 марта" },
  { id: 2, title: "Овощной бум", desc: "2 кг за цену 1 на сезонные овощи", emoji: "🥦", color: "bg-shop-green-soft border-green-100", badge: "Хит" },
  { id: 3, title: "Хлеб свежий", desc: "Скидка 15% на выпечку с 9:00 до 12:00", emoji: "🍞", color: "bg-amber-50 border-amber-100", badge: "Каждый день" },
  { id: 4, title: "3 по цене 2", desc: "На все напитки при покупке трёх штук", emoji: "🧃", color: "bg-shop-red-soft border-red-100", badge: "Акция" },
];

const PromoPage = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [promos, setPromos] = useState(PROMOS);
  const [tab, setTab] = useState<"promos" | "sales" | "manage">("promos");

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const addPromo = () => {
    if (!newCode || !newDiscount) return;
    setPromos((p) => [
      ...p,
      { id: Date.now(), code: newCode.toUpperCase(), discount: newDiscount, desc: newDesc || "Промокод", expires: "—", minOrder: 0, used: false },
    ]);
    setNewCode("");
    setNewDiscount("");
    setNewDesc("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-shop-dark mb-6">Акции и промокоды</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["promos", "sales", "manage"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              tab === t ? "bg-shop-red text-white" : "bg-white border border-gray-200 text-gray-500 hover:text-shop-red hover:border-shop-red"
            }`}
          >
            {t === "promos" ? "Промокоды" : t === "sales" ? "Акции" : "Управление"}
          </button>
        ))}
      </div>

      {tab === "promos" && (
        <div className="grid sm:grid-cols-2 gap-4">
          {promos.map((promo, i) => (
            <div
              key={promo.id}
              className={`bg-white rounded-2xl p-5 border border-gray-100 animate-fade-in ${promo.used ? "opacity-50" : ""}`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-2xl font-black text-shop-red">{promo.discount}</span>
                  <p className="text-sm text-gray-600 mt-0.5">{promo.desc}</p>
                </div>
                {promo.used ? (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-400 text-xs rounded-lg">Использован</span>
                ) : (
                  <span className="px-2 py-0.5 bg-shop-green-soft text-shop-green text-xs rounded-lg font-medium">Активен</span>
                )}
              </div>

              <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
                <span className="font-mono font-bold text-shop-dark tracking-widest">{promo.code}</span>
                <button
                  onClick={() => copyCode(promo.code)}
                  disabled={promo.used}
                  className="flex items-center gap-1 text-xs text-shop-red font-semibold hover:opacity-70 transition-opacity disabled:opacity-40"
                >
                  {copied === promo.code ? (
                    <><Icon name="Check" size={14} /> Скопировано</>
                  ) : (
                    <><Icon name="Copy" size={14} /> Скопировать</>
                  )}
                </button>
              </div>

              <div className="flex justify-between mt-3 text-xs text-gray-400">
                <span>До {promo.expires}</span>
                <span>От {promo.minOrder} ₽</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "sales" && (
        <div className="grid sm:grid-cols-2 gap-4">
          {SALES.map((sale, i) => (
            <div
              key={sale.id}
              className={`rounded-2xl p-5 border ${sale.color} animate-fade-in`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{sale.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-shop-dark">{sale.title}</h3>
                    <span className="px-2 py-0.5 bg-shop-red text-white text-xs rounded-lg">{sale.badge}</span>
                  </div>
                  <p className="text-sm text-gray-600">{sale.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "manage" && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <h3 className="font-bold text-shop-dark mb-4 flex items-center gap-2">
              <Icon name="Plus" size={18} />
              Создать промокод
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Код</label>
                  <input
                    type="text"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    placeholder="PROMO2024"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm font-mono uppercase focus:outline-none focus:border-shop-red"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Скидка</label>
                  <input
                    type="text"
                    value={newDiscount}
                    onChange={(e) => setNewDiscount(e.target.value)}
                    placeholder="15%"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-shop-red"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Описание</label>
                <input
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Описание акции"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-shop-red"
                />
              </div>
              <button
                onClick={addPromo}
                disabled={!newCode || !newDiscount}
                className="w-full py-2.5 bg-shop-red text-white rounded-xl font-semibold text-sm hover:bg-shop-red-light transition-colors disabled:opacity-40"
              >
                Создать промокод
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <h3 className="font-bold text-shop-dark mb-4">Все промокоды</h3>
            <div className="space-y-2">
              {promos.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="font-mono font-bold text-sm">{p.code}</span>
                  <span className="text-sm text-shop-red font-semibold">{p.discount}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-lg ${p.used ? "bg-gray-200 text-gray-400" : "bg-shop-green-soft text-shop-green"}`}>
                    {p.used ? "Использован" : "Активен"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoPage;
