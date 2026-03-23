import { Page } from "@/App";
import Icon from "@/components/ui/icon";

type Props = {
  setPage: (p: Page) => void;
  goToCategory: (catId: string) => void;
};

const CATALOG_CATEGORIES = [
  {
    id: "vegetables",
    label: "Овощи",
    emoji: "🥦",
    desc: "Свежие овощи с доставкой",
    items: ["Томаты", "Огурцы", "Перец", "Морковь", "Капуста"],
    color: "bg-green-50 border-green-100",
    accent: "text-green-700",
    count: 48,
  },
  {
    id: "fruits",
    label: "Фрукты",
    emoji: "🍎",
    desc: "Сезонные и экзотические",
    items: ["Яблоки", "Бананы", "Апельсины", "Виноград", "Клубника"],
    color: "bg-red-50 border-red-100",
    accent: "text-red-600",
    count: 36,
  },
  {
    id: "dairy",
    label: "Молочные продукты",
    emoji: "🥛",
    desc: "Молоко, сыры, йогурты",
    items: ["Молоко", "Сыр", "Кефир", "Творог", "Сметана"],
    color: "bg-blue-50 border-blue-100",
    accent: "text-blue-700",
    count: 62,
  },
  {
    id: "bakery",
    label: "Хлеб и выпечка",
    emoji: "🍞",
    desc: "Свежая выпечка каждое утро",
    items: ["Хлеб", "Батон", "Багет", "Круассаны", "Пирожки"],
    color: "bg-amber-50 border-amber-100",
    accent: "text-amber-700",
    count: 29,
  },
  {
    id: "meat",
    label: "Мясо и птица",
    emoji: "🥩",
    desc: "Охлаждённое и замороженное",
    items: ["Курица", "Говядина", "Свинина", "Фарш", "Колбасы"],
    color: "bg-rose-50 border-rose-100",
    accent: "text-rose-700",
    count: 54,
  },
  {
    id: "fish",
    label: "Рыба и морепродукты",
    emoji: "🐟",
    desc: "Охлаждённая и замороженная",
    items: ["Лосось", "Тунец", "Минтай", "Креветки", "Кальмар"],
    color: "bg-cyan-50 border-cyan-100",
    accent: "text-cyan-700",
    count: 33,
  },
  {
    id: "drinks",
    label: "Напитки",
    emoji: "🧃",
    desc: "Соки, воды, газировка",
    items: ["Соки", "Вода", "Газировка", "Чай", "Кофе"],
    color: "bg-orange-50 border-orange-100",
    accent: "text-orange-700",
    count: 71,
  },
  {
    id: "snacks",
    label: "Снэки и сладкое",
    emoji: "🍿",
    desc: "Чипсы, шоколад, печенье",
    items: ["Чипсы", "Шоколад", "Печенье", "Конфеты", "Орехи"],
    color: "bg-purple-50 border-purple-100",
    accent: "text-purple-700",
    count: 88,
  },
  {
    id: "frozen",
    label: "Заморозка",
    emoji: "🧊",
    desc: "Полуфабрикаты, пельмени",
    items: ["Пельмени", "Вареники", "Пицца", "Котлеты", "Блинчики"],
    color: "bg-sky-50 border-sky-100",
    accent: "text-sky-700",
    count: 45,
  },
  {
    id: "grocery",
    label: "Бакалея",
    emoji: "🌾",
    desc: "Крупы, макароны, масло",
    items: ["Рис", "Гречка", "Макароны", "Масло", "Мука"],
    color: "bg-yellow-50 border-yellow-100",
    accent: "text-yellow-700",
    count: 93,
  },
  {
    id: "household",
    label: "Бытовая химия",
    emoji: "🧴",
    desc: "Моющие средства, уход",
    items: ["Стиральный порошок", "Средство для посуды", "Шампунь"],
    color: "bg-teal-50 border-teal-100",
    accent: "text-teal-700",
    count: 57,
  },
  {
    id: "baby",
    label: "Детские товары",
    emoji: "👶",
    desc: "Питание и уход для малышей",
    items: ["Пюре", "Каши", "Смеси", "Подгузники", "Игрушки"],
    color: "bg-pink-50 border-pink-100",
    accent: "text-pink-700",
    count: 41,
  },
];

const CategoriesPage = ({ goToCategory }: Props) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-shop-dark">Каталог товаров</h1>
        <span className="px-3 py-1 bg-shop-red-soft text-shop-red text-sm font-semibold rounded-xl">
          {CATALOG_CATEGORIES.reduce((s, c) => s + c.count, 0)}+ товаров
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATALOG_CATEGORIES.map((cat, i) => (
          <button
            key={cat.id}
            onClick={() => goToCategory(cat.id)}
            className={`text-left rounded-2xl border p-5 ${cat.color} hover:shadow-md transition-all group animate-fade-in`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-4xl group-hover:scale-110 transition-transform inline-block">
                {cat.emoji}
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-400 bg-white/70 px-2 py-1 rounded-lg">
                <Icon name="Package" size={12} />
                {cat.count} шт
              </div>
            </div>

            <h3 className={`font-bold text-base mb-1 ${cat.accent}`}>{cat.label}</h3>
            <p className="text-xs text-gray-500 mb-3">{cat.desc}</p>

            <div className="flex flex-wrap gap-1">
              {cat.items.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className="text-xs bg-white/70 text-gray-600 px-2 py-0.5 rounded-lg"
                >
                  {item}
                </span>
              ))}
              {cat.items.length > 3 && (
                <span className="text-xs text-gray-400 px-2 py-0.5">
                  +{cat.items.length - 3}
                </span>
              )}
            </div>

            <div className={`flex items-center gap-1 mt-3 text-xs font-semibold ${cat.accent} opacity-0 group-hover:opacity-100 transition-opacity`}>
              Смотреть все
              <Icon name="ArrowRight" size={12} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
