import { useState } from "react";
import Icon from "@/components/ui/icon";

type Props = {
  onClose: () => void;
};

const SUGGESTIONS = [
  "Что купить на неделю для семьи?",
  "Какие акции сейчас действуют?",
  "Помоги составить список покупок",
  "Что сочетается с томатами черри?",
];

const RESPONSES: Record<string, string> = {
  default: "Привет! Я ваш ИИ-помощник в ФрешМаркет. Помогу найти товары, подскажу рецепты и расскажу об акциях 🍃",
  "Что купить на неделю для семьи?": "Рекомендую: молоко, хлеб, яйца, куриное филе, сезонные овощи (томаты, огурцы, перец), фрукты (яблоки, бананы), сыр и йогурты. Это ~2500 ₽ на 4 человек.",
  "Какие акции сейчас действуют?": "Сейчас активны: -25% на молочку в пятницу, -30% на весь ассортимент по коду SPRING30, и акция «2 кг за цену 1» на сезонные овощи. Загляните во вкладку Акции!",
  "Помоги составить список покупок": "Конечно! Базовый список: хлеб, молоко, масло, яйца, мясо или рыба, 3-4 вида овощей, фрукты, крупы. Хотите, добавлю конкретные товары из нашего каталога?",
  "Что сочетается с томатами черри?": "Томаты черри отлично идут с: моцареллой, базиликом, оливковым маслом (классический капрезе), авокадо, огурцами и зеленью — в лёгкий салат. Также хороши в пасте!",
};

const AiAssistant = ({ onClose }: Props) => {
  const [messages, setMessages] = useState([
    { from: "ai", text: RESPONSES.default },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    const response = RESPONSES[text] || "Интересный вопрос! Рекомендую посмотреть наш каталог — там найдёте много интересного. Если нужна помощь с выбором, уточните запрос 🛒";
    setMessages((m) => [
      ...m,
      { from: "user", text },
      { from: "ai", text: response },
    ]);
    setInput("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-scale-in flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center gap-3 p-5 border-b border-gray-100">
          <div className="w-10 h-10 rounded-2xl bg-shop-red flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"/>
              <circle cx="9" cy="11" r="1" fill="white" stroke="none"/>
              <circle cx="15" cy="11" r="1" fill="white" stroke="none"/>
            </svg>
          </div>
          <div>
            <p className="font-bold text-shop-dark">ИИ-помощник</p>
            <p className="text-xs text-shop-green flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-shop-green inline-block animate-pulse-soft"></span>
              Онлайн
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.from === "user"
                  ? "bg-shop-red text-white rounded-br-sm"
                  : "bg-gray-100 text-shop-dark rounded-bl-sm"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="px-3 py-1.5 bg-shop-red-soft text-shop-red rounded-xl text-xs font-medium hover:bg-red-100 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-100 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Спросите что-нибудь..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-shop-red"
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim()}
            className="w-10 h-10 bg-shop-red text-white rounded-xl flex items-center justify-center hover:bg-shop-red-light transition-colors disabled:opacity-40"
          >
            <Icon name="Send" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
