import { useState } from "react";
import { Page } from "@/App";
import Icon from "@/components/ui/icon";

type Props = {
  setPage: (p: Page) => void;
};

const ORDERS = [
  { id: "#4821", date: "20 марта 2026", status: "Доставлен", total: 1340, items: ["Томаты черри", "Молоко", "Хлеб"] },
  { id: "#4755", date: "15 марта 2026", status: "Доставлен", total: 2190, items: ["Яблоки", "Сыр", "Огурцы", "Кефир"] },
  { id: "#4701", date: "10 марта 2026", status: "Отменён", total: 870, items: ["Бананы", "Морковь"] },
];

const ProfilePage = ({ setPage }: Props) => {
  const [tab, setTab] = useState<"orders" | "settings">("orders");
  const [name, setName] = useState("Иван Петров");
  const [phone, setPhone] = useState("+7 (999) 123-45-67");
  const [email, setEmail] = useState("ivan@mail.ru");

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Profile header */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-shop-red to-red-700 flex items-center justify-center text-white text-2xl font-bold">
            {name.charAt(0)}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-shop-dark">{name}</h2>
            <p className="text-sm text-gray-500">{phone}</p>
            <div className="flex items-center gap-1 mt-1">
              <Icon name="Star" size={14} className="text-amber-400" />
              <span className="text-xs text-gray-500">Постоянный покупатель</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-shop-green">💰 840 ₽</div>
            <div className="text-xs text-gray-400">бонусов</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["orders", "settings"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              tab === t ? "bg-shop-red text-white" : "bg-white border border-gray-200 text-gray-500 hover:text-shop-red"
            }`}
          >
            {t === "orders" ? "История заказов" : "Настройки"}
          </button>
        ))}
      </div>

      {tab === "orders" && (
        <div className="space-y-4">
          {ORDERS.map((order, i) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-5 border border-gray-100 animate-fade-in"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="font-bold text-shop-dark">{order.id}</span>
                  <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                  order.status === "Доставлен"
                    ? "bg-shop-green-soft text-shop-green"
                    : "bg-shop-red-soft text-shop-red"
                }`}>
                  {order.status}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-3 line-clamp-1">
                {order.items.join(", ")}
              </p>

              <div className="flex items-center justify-between">
                <span className="font-bold text-shop-dark">{order.total} ₽</span>
                <button className="text-xs text-shop-red font-medium hover:opacity-70 transition-opacity flex items-center gap-1">
                  Повторить заказ
                  <Icon name="RefreshCw" size={12} />
                </button>
              </div>
            </div>
          ))}

          {ORDERS.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-3">📦</div>
              <p>Заказов пока нет</p>
            </div>
          )}
        </div>
      )}

      {tab === "settings" && (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 animate-fade-in">
          <h3 className="font-bold text-shop-dark mb-5">Личные данные</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Имя</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-shop-red"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Телефон</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-shop-red"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-shop-red"
              />
            </div>
            <button className="w-full py-2.5 bg-shop-red text-white rounded-xl font-semibold text-sm hover:bg-shop-red-light transition-colors">
              Сохранить
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
