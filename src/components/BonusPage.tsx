import { useState } from "react";
import Icon from "@/components/ui/icon";

const BONUS_HISTORY = [
  { id: 1, date: "20 мар 2026", desc: "Заказ #4821", type: "earn", amount: +67 },
  { id: 2, date: "15 мар 2026", desc: "Заказ #4755", type: "earn", amount: +110 },
  { id: 3, date: "12 мар 2026", desc: "Списание на заказ #4744", type: "spend", amount: -200 },
  { id: 4, date: "5 мар 2026", desc: "Бонус за регистрацию", type: "earn", amount: +300 },
  { id: 5, date: "1 мар 2026", desc: "Заказ #4690", type: "earn", amount: +43 },
];

const LEVELS = [
  { name: "Стартер", min: 0, max: 1000, color: "bg-gray-400", emoji: "🌱" },
  { name: "Серебро", min: 1000, max: 5000, color: "bg-gray-400", emoji: "🥈" },
  { name: "Золото", min: 5000, max: 15000, color: "bg-amber-400", emoji: "🥇" },
  { name: "Платина", min: 15000, max: 999999, color: "bg-blue-500", emoji: "💎" },
];

const currentBalance = 840;
const currentLevel = LEVELS[0];
const nextLevel = LEVELS[1];
const progressPct = Math.min((currentBalance / nextLevel.min) * 100, 100);

// SVG QR-code (декоративный паттерн)
const QRCode = () => (
  <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Corner squares */}
    <rect x="10" y="10" width="40" height="40" rx="4" fill="#1A1A1A"/>
    <rect x="16" y="16" width="28" height="28" rx="2" fill="white"/>
    <rect x="22" y="22" width="16" height="16" rx="1" fill="#1A1A1A"/>

    <rect x="90" y="10" width="40" height="40" rx="4" fill="#1A1A1A"/>
    <rect x="96" y="16" width="28" height="28" rx="2" fill="white"/>
    <rect x="102" y="22" width="16" height="16" rx="1" fill="#1A1A1A"/>

    <rect x="10" y="90" width="40" height="40" rx="4" fill="#1A1A1A"/>
    <rect x="16" y="96" width="28" height="28" rx="2" fill="white"/>
    <rect x="22" y="102" width="16" height="16" rx="1" fill="#1A1A1A"/>

    {/* Data dots */}
    <rect x="58" y="10" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="70" y="10" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="58" y="22" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="70" y="22" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="58" y="34" width="8" height="8" rx="1" fill="#1A1A1A"/>

    <rect x="10" y="58" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="22" y="58" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="10" y="70" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="34" y="70" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="22" y="82" width="8" height="8" rx="1" fill="#1A1A1A"/>

    <rect x="58" y="58" width="8" height="8" rx="1" fill="#C0392B"/>
    <rect x="70" y="58" width="8" height="8" rx="1" fill="#C0392B"/>
    <rect x="82" y="58" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="58" y="70" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="82" y="70" width="8" height="8" rx="1" fill="#C0392B"/>
    <rect x="70" y="82" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="82" y="82" width="8" height="8" rx="1" fill="#1A1A1A"/>

    <rect x="94" y="58" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="106" y="58" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="118" y="58" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="94" y="70" width="8" height="8" rx="1" fill="#C0392B"/>
    <rect x="118" y="70" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="106" y="82" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="118" y="82" width="8" height="8" rx="1" fill="#1A1A1A"/>

    <rect x="58" y="94" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="82" y="94" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="70" y="106" width="8" height="8" rx="1" fill="#C0392B"/>
    <rect x="82" y="106" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="58" y="118" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="70" y="118" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="94" y="94" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="106" y="94" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="118" y="106" width="8" height="8" rx="1" fill="#C0392B"/>
    <rect x="94" y="118" width="8" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="118" y="118" width="8" height="8" rx="1" fill="#1A1A1A"/>
  </svg>
);

const EARN_WAYS = [
  { emoji: "🛒", title: "За покупку", desc: "5% от суммы каждого заказа", bonus: "5%" },
  { emoji: "⭐", title: "Отзыв о товаре", desc: "Напишите отзыв на любой купленный товар", bonus: "+30 ⭐", action: true },
  { emoji: "📷", title: "Фото товара", desc: "Прикрепите фото к отзыву", bonus: "+50 ⭐", action: true },
  { emoji: "🎮", title: "Ежедневная игра", desc: "Найди все слова и получи бонусы", bonus: "+27 ⭐", action: true },
  { emoji: "👥", title: "Пригласи друга", desc: "Друг сделает первый заказ", bonus: "+200 ⭐", action: true },
  { emoji: "🎂", title: "День рождения", desc: "Двойные бонусы в ваш день рождения", bonus: "×2" },
];

const BonusPage = () => {
  const [tab, setTab] = useState<"card" | "earn" | "history" | "levels">("card");
  const [reviewProduct, setReviewProduct] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewPhoto, setReviewPhoto] = useState(false);
  const [reviewSent, setReviewSent] = useState(false);

  const submitReview = () => {
    if (!reviewText.trim()) return;
    setReviewSent(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-shop-dark mb-6">Бонусная программа</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        {([
          { id: "card", label: "Моя карта" },
          { id: "earn", label: "Как заработать" },
          { id: "history", label: "История" },
          { id: "levels", label: "Уровни" },
        ] as const).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              tab === t.id ? "bg-shop-red text-white" : "bg-white border border-gray-200 text-gray-500 hover:text-shop-red"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "card" && (
        <div className="space-y-5 animate-fade-in">
          {/* Bonus card */}
          <div className="relative rounded-3xl bg-gradient-to-br from-shop-dark via-gray-800 to-shop-red text-white p-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-shop-red/20 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-widest mb-1">knkamur</p>
                  <p className="text-xs text-white/60">Бонусная карта</p>
                </div>
                <span className="text-2xl">{currentLevel.emoji}</span>
              </div>

              <div className="mb-6">
                <p className="text-white/60 text-xs mb-1">Ваш баланс</p>
                <p className="text-4xl font-black">
                  {currentBalance} <span className="text-2xl font-normal text-white/70">бонусов</span>
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-xs">Уровень</p>
                  <p className="font-bold">{currentLevel.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-xs">Карта</p>
                  <p className="font-mono font-bold tracking-wider">KNK-2024-8401</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress to next level */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="font-semibold text-shop-dark">До уровня «{nextLevel.name}»</p>
                <p className="text-xs text-gray-400 mt-0.5">Осталось {nextLevel.min - currentBalance} бонусов</p>
              </div>
              <span className="text-2xl">{nextLevel.emoji}</span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-shop-red to-shop-green rounded-full transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{currentBalance}</span>
              <span>{nextLevel.min}</span>
            </div>
          </div>

          {/* QR code block */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-shop-dark mb-1 flex items-center gap-2">
              <Icon name="QrCode" size={18} className="text-shop-red" />
              QR-код для начисления бонусов
            </h3>
            <p className="text-xs text-gray-500 mb-5">
              Покажите код на кассе или отсканируйте в приложении для начисления бонусов
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 shadow-sm shrink-0">
                <QRCode />
              </div>

              <div className="flex-1 space-y-4 text-center sm:text-left">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Номер карты</p>
                  <p className="font-mono font-bold text-shop-dark text-lg tracking-widest">KNK-2024-8401</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-shop-green-soft rounded-xl p-3 text-center">
                    <p className="text-xl font-black text-shop-green">5%</p>
                    <p className="text-xs text-gray-500">кэшбэк с заказа</p>
                  </div>
                  <div className="bg-shop-red-soft rounded-xl p-3 text-center">
                    <p className="text-xl font-black text-shop-red">×2</p>
                    <p className="text-xs text-gray-500">бонусы в пятницу</p>
                  </div>
                </div>

                <p className="text-xs text-gray-400">
                  1 бонус = 1 рубль скидки. Списывать можно до 30% от суммы заказа.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "earn" && (
        <div className="space-y-4 animate-fade-in">
          <p className="text-sm text-gray-500">Зарабатывай бонусы разными способами</p>

          {EARN_WAYS.map((way, i) => (
            <div
              key={way.title}
              className="bg-white rounded-2xl border border-gray-100 p-5 animate-fade-in"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{way.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-shop-dark">{way.title}</h3>
                    <span className="font-black text-shop-green text-sm">{way.bonus}</span>
                  </div>
                  <p className="text-xs text-gray-500">{way.desc}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Review form */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-shop-dark mb-1 flex items-center gap-2">
              <span>⭐</span> Написать отзыв и получить бонусы
            </h3>
            <p className="text-xs text-gray-400 mb-4">Отзыв — +30 бонусов, фото — ещё +50 бонусов</p>

            {reviewSent ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">🎉</div>
                <p className="font-bold text-shop-dark mb-1">Отзыв отправлен!</p>
                <p className="text-sm text-shop-green font-semibold">
                  +{reviewPhoto ? 80 : 30} бонусов начислено
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Название товара (например: Томаты черри)"
                  value={reviewProduct}
                  onChange={(e) => setReviewProduct(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-shop-red"
                />
                <textarea
                  placeholder="Ваш отзыв о товаре (минимум 20 символов)..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-shop-red resize-none"
                />

                {/* Photo upload stub */}
                <div
                  onClick={() => setReviewPhoto(!reviewPhoto)}
                  className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                    reviewPhoto
                      ? "border-shop-green bg-shop-green-soft"
                      : "border-gray-200 hover:border-shop-red"
                  }`}
                >
                  {reviewPhoto ? (
                    <div className="flex items-center justify-center gap-2 text-shop-green font-semibold text-sm">
                      <Icon name="CheckCircle" size={16} />
                      Фото прикреплено (+50 бонусов)
                    </div>
                  ) : (
                    <div className="text-gray-400 text-sm">
                      <div className="text-2xl mb-1">📷</div>
                      Прикрепить фото (+50 бонусов)
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-shop-green font-semibold">
                    Получите: +{reviewPhoto ? 80 : 30} бонусов
                  </span>
                  <button
                    onClick={submitReview}
                    disabled={reviewText.length < 20}
                    className="px-5 py-2.5 bg-shop-red text-white rounded-xl text-sm font-bold hover:bg-shop-red-light transition-colors disabled:opacity-40"
                  >
                    Отправить отзыв
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "history" && (
        <div className="space-y-3 animate-fade-in">
          {BONUS_HISTORY.map((item, i) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center justify-between"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  item.type === "earn" ? "bg-shop-green-soft" : "bg-shop-red-soft"
                }`}>
                  <Icon
                    name={item.type === "earn" ? "TrendingUp" : "TrendingDown"}
                    size={18}
                    className={item.type === "earn" ? "text-shop-green" : "text-shop-red"}
                  />
                </div>
                <div>
                  <p className="font-semibold text-shop-dark text-sm">{item.desc}</p>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </div>
              </div>
              <span className={`font-bold text-base ${
                item.type === "earn" ? "text-shop-green" : "text-shop-red"
              }`}>
                {item.amount > 0 ? "+" : ""}{item.amount} ⭐
              </span>
            </div>
          ))}
        </div>
      )}

      {tab === "levels" && (
        <div className="space-y-4 animate-fade-in">
          <p className="text-sm text-gray-500 mb-2">Чем больше покупаешь — тем выгоднее условия</p>
          {LEVELS.map((level, i) => {
            const isActive = level.id === currentLevel.id;
            return (
              <div
                key={level.name}
                className={`rounded-2xl p-5 border transition-all ${
                  isActive ? "border-shop-red bg-shop-red-soft" : "bg-white border-gray-100"
                }`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{level.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-bold ${isActive ? "text-shop-red" : "text-shop-dark"}`}>
                        {level.name}
                      </h3>
                      {isActive && (
                        <span className="px-2 py-0.5 bg-shop-red text-white text-xs rounded-lg font-semibold">
                          Ваш уровень
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {level.min === 0 ? "До" : "От"} {level.max === 999999 ? `${level.min}+` : `${level.max}`} бонусов
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-lg text-shop-green">{5 + i * 2}%</p>
                    <p className="text-xs text-gray-400">кэшбэк</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BonusPage;