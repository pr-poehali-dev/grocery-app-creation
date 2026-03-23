import { useState } from "react";
import { Page } from "@/App";
import Icon from "@/components/ui/icon";

type Props = {
  setPage: (p: Page) => void;
  cartTotal: number;
};

type DeliveryType = "courier" | "pickup" | "express";

const PICKUP_POINTS = [
  { id: 1, name: "ФрешМаркет на Ленина", address: "ул. Ленина, 42", time: "09:00 – 22:00", distance: "0.3 км" },
  { id: 2, name: "ФрешМаркет Центральный", address: "пр. Мира, 15", time: "08:00 – 23:00", distance: "1.1 км" },
  { id: 3, name: "ФрешМаркет на Садовой", address: "ул. Садовая, 7", time: "10:00 – 21:00", distance: "2.4 км" },
];

const TIME_SLOTS = [
  "09:00 – 11:00",
  "11:00 – 13:00",
  "13:00 – 15:00",
  "15:00 – 17:00",
  "17:00 – 19:00",
  "19:00 – 21:00",
];

const DeliveryPage = ({ setPage, cartTotal }: Props) => {
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("courier");
  const [address, setAddress] = useState("");
  const [flat, setFlat] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);
  const [selectedPickup, setSelectedPickup] = useState(PICKUP_POINTS[0].id);
  const [comment, setComment] = useState("");
  const [payment, setPayment] = useState<"card" | "cash" | "online">("online");
  const [placed, setPlaced] = useState(false);

  const deliveryCost = cartTotal >= 1500 ? 0 : deliveryType === "express" ? 399 : 199;
  const expressAdd = deliveryType === "express" ? 200 : 0;
  const totalCost = cartTotal + (deliveryType === "pickup" ? 0 : deliveryCost) + expressAdd;

  if (placed) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-shop-green-soft flex items-center justify-center mx-auto mb-6">
          <Icon name="Check" size={40} className="text-shop-green" />
        </div>
        <h2 className="text-2xl font-bold text-shop-dark mb-2">Заказ оформлен!</h2>
        <p className="text-gray-500 mb-1">Ваш заказ <span className="font-bold text-shop-dark">#5012</span></p>
        <p className="text-gray-500 mb-6 text-sm">
          {deliveryType === "pickup"
            ? "Будет готов к самовывозу через 30 минут"
            : deliveryType === "express"
            ? "Курьер приедет в течение 30 минут"
            : `Ждём вас в ${selectedSlot}`}
        </p>
        <div className="bg-shop-green-soft rounded-2xl p-4 mb-6 text-sm text-shop-green font-medium">
          Начислено <strong>+{Math.round(totalCost * 0.05)} бонусов</strong> на счёт
        </div>
        <button
          onClick={() => setPage("home")}
          className="px-8 py-3 bg-shop-red text-white rounded-xl font-bold hover:bg-shop-red-light transition-colors"
        >
          На главную
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setPage("cart")}
          className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Icon name="ArrowLeft" size={20} />
        </button>
        <h1 className="text-2xl font-bold text-shop-dark">Оформление доставки</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-5">

          {/* Delivery type */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 animate-fade-in">
            <h3 className="font-bold text-shop-dark mb-4 flex items-center gap-2">
              <Icon name="Truck" size={18} className="text-shop-red" />
              Способ получения
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {([
                { id: "courier", label: "Курьер", emoji: "🚴", desc: "До двери" },
                { id: "express", label: "Экспресс", emoji: "⚡", desc: "30 минут" },
                { id: "pickup", label: "Самовывоз", emoji: "🏪", desc: "Бесплатно" },
              ] as const).map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setDeliveryType(opt.id)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                    deliveryType === opt.id
                      ? "border-shop-red bg-shop-red-soft"
                      : "border-gray-200 hover:border-shop-red/30"
                  }`}
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <span className={`font-semibold text-sm ${deliveryType === opt.id ? "text-shop-red" : "text-shop-dark"}`}>
                    {opt.label}
                  </span>
                  <span className="text-xs text-gray-400">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Address / Pickup */}
          {deliveryType !== "pickup" ? (
            <div className="bg-white rounded-2xl p-5 border border-gray-100 animate-fade-in">
              <h3 className="font-bold text-shop-dark mb-4 flex items-center gap-2">
                <Icon name="MapPin" size={18} className="text-shop-red" />
                Адрес доставки
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Улица, дом"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-shop-red"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={flat}
                    onChange={(e) => setFlat(e.target.value)}
                    placeholder="Квартира / офис"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-shop-red"
                  />
                  <input
                    type="text"
                    placeholder="Подъезд"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-shop-red"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-5 border border-gray-100 animate-fade-in">
              <h3 className="font-bold text-shop-dark mb-4 flex items-center gap-2">
                <Icon name="MapPin" size={18} className="text-shop-red" />
                Пункт самовывоза
              </h3>
              <div className="space-y-2">
                {PICKUP_POINTS.map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => setSelectedPickup(pt.id)}
                    className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                      selectedPickup === pt.id
                        ? "border-shop-green bg-shop-green-soft"
                        : "border-gray-200 hover:border-shop-green/40"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className={`font-semibold text-sm ${selectedPickup === pt.id ? "text-shop-green" : "text-shop-dark"}`}>
                          {pt.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{pt.address}</p>
                        <p className="text-xs text-gray-400">{pt.time}</p>
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg text-gray-500 shrink-0 ml-2">
                        {pt.distance}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Time slot */}
          {deliveryType !== "express" && deliveryType !== "pickup" && (
            <div className="bg-white rounded-2xl p-5 border border-gray-100 animate-fade-in">
              <h3 className="font-bold text-shop-dark mb-4 flex items-center gap-2">
                <Icon name="Clock" size={18} className="text-shop-red" />
                Время доставки
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                      selectedSlot === slot
                        ? "bg-shop-red text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-shop-red-soft hover:text-shop-red"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Comment */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 animate-fade-in">
            <h3 className="font-bold text-shop-dark mb-3 flex items-center gap-2">
              <Icon name="MessageSquare" size={18} className="text-shop-red" />
              Комментарий
            </h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Позвоните за 15 минут, не звонить в домофон..."
              rows={2}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-shop-red resize-none"
            />
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 animate-fade-in">
            <h3 className="font-bold text-shop-dark mb-4 flex items-center gap-2">
              <Icon name="CreditCard" size={18} className="text-shop-red" />
              Способ оплаты
            </h3>
            <div className="space-y-2">
              {([
                { id: "online", label: "Онлайн картой", desc: "Visa, Mastercard, МИР", emoji: "💳" },
                { id: "card", label: "Картой при получении", desc: "Терминал у курьера", emoji: "🏧" },
                { id: "cash", label: "Наличными", desc: "При получении заказа", emoji: "💵" },
              ] as const).map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setPayment(opt.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                    payment === opt.id
                      ? "border-shop-red bg-shop-red-soft"
                      : "border-gray-200 hover:border-shop-red/30"
                  }`}
                >
                  <span className="text-xl">{opt.emoji}</span>
                  <div className="text-left">
                    <p className={`font-semibold text-sm ${payment === opt.id ? "text-shop-red" : "text-shop-dark"}`}>
                      {opt.label}
                    </p>
                    <p className="text-xs text-gray-400">{opt.desc}</p>
                  </div>
                  {payment === opt.id && (
                    <Icon name="CheckCircle" size={18} className="text-shop-red ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 animate-fade-in sticky top-24">
            <h3 className="font-bold text-shop-dark mb-4">Ваш заказ</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Товары</span>
                <span>{cartTotal} ₽</span>
              </div>
              {deliveryType !== "pickup" && (
                <div className="flex justify-between text-gray-500">
                  <span>Доставка</span>
                  <span className={deliveryCost === 0 ? "text-shop-green font-semibold" : ""}>
                    {deliveryCost === 0 ? "Бесплатно" : `${deliveryCost} ₽`}
                  </span>
                </div>
              )}
              {deliveryType === "express" && (
                <div className="flex justify-between text-gray-500">
                  <span>Экспресс-наценка</span>
                  <span>+{expressAdd} ₽</span>
                </div>
              )}
              {deliveryType === "pickup" && (
                <div className="flex justify-between text-shop-green font-medium">
                  <span>Самовывоз</span>
                  <span>Бесплатно</span>
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between font-bold text-shop-dark mb-4">
              <span>Итого</span>
              <span className="text-shop-red text-lg">{totalCost} ₽</span>
            </div>

            {/* Delivery info badge */}
            <div className={`p-3 rounded-xl text-xs font-medium mb-4 ${
              deliveryType === "express"
                ? "bg-amber-50 text-amber-700"
                : deliveryType === "pickup"
                ? "bg-shop-green-soft text-shop-green"
                : "bg-shop-red-soft text-shop-red"
            }`}>
              {deliveryType === "express" && "⚡ Курьер приедет в течение 30 минут"}
              {deliveryType === "courier" && `🚴 Доставим сегодня в ${selectedSlot}`}
              {deliveryType === "pickup" && "🏪 Готово к самовывозу через 30 мин"}
            </div>

            <button
              onClick={() => setPlaced(true)}
              className="w-full py-3 bg-shop-red text-white rounded-xl font-bold hover:bg-shop-red-light transition-colors"
            >
              Подтвердить заказ
            </button>

            <p className="text-xs text-gray-400 text-center mt-3">
              Нажимая кнопку, вы соглашаетесь с условиями доставки
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
