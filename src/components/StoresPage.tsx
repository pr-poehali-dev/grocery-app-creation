import { useState } from "react";
import Icon from "@/components/ui/icon";

const STORES = [
  {
    id: 1,
    name: "knkamur на Ленина",
    address: "ул. Ленина, 42",
    city: "Комсомольск-на-Амуре",
    phone: "+7 (4217) 55-01-01",
    hours: "09:00 – 22:00",
    lat: 50.5493,
    lng: 137.0075,
    features: ["Доставка", "Самовывоз", "Парковка"],
    distance: "0.3 км",
    status: "open",
  },
  {
    id: 2,
    name: "knkamur Центральный",
    address: "пр. Мира, 15",
    city: "Комсомольск-на-Амуре",
    phone: "+7 (4217) 55-01-02",
    hours: "08:00 – 23:00",
    lat: 50.5510,
    lng: 137.0090,
    features: ["Доставка", "Самовывоз", "Кафе"],
    distance: "1.1 км",
    status: "open",
  },
  {
    id: 3,
    name: "knkamur на Садовой",
    address: "ул. Садовая, 7",
    city: "Комсомольск-на-Амуре",
    phone: "+7 (4217) 55-01-03",
    hours: "10:00 – 21:00",
    lat: 50.5460,
    lng: 137.0050,
    features: ["Самовывоз", "Парковка"],
    distance: "2.4 км",
    status: "open",
  },
  {
    id: 4,
    name: "knkamur на Вокзальной",
    address: "ул. Вокзальная, 3",
    city: "Комсомольск-на-Амуре",
    phone: "+7 (4217) 55-01-04",
    hours: "10:00 – 20:00",
    lat: 50.5530,
    lng: 137.0120,
    features: ["Самовывоз"],
    distance: "3.0 км",
    status: "closed",
  },
];

const FEATURE_ICONS: Record<string, string> = {
  "Доставка": "Truck",
  "Самовывоз": "ShoppingBag",
  "Парковка": "Car",
  "Кафе": "Coffee",
};

const StoresPage = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [locationGranted, setLocationGranted] = useState(false);
  const [locating, setLocating] = useState(false);
  const [search, setSearch] = useState("");

  const handleGeo = () => {
    setLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocationGranted(true);
          setLocating(false);
        },
        () => {
          setLocating(false);
          alert("Не удалось получить геолокацию. Разрешите доступ в настройках браузера.");
        }
      );
    } else {
      setLocating(false);
    }
  };

  const filtered = STORES.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase())
  );

  const activeStore = selected ? STORES.find((s) => s.id === selected) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-shop-dark mb-2">Наши магазины</h1>
      <p className="text-gray-500 text-sm mb-6">Выберите магазин для заказа или самовывоза</p>

      {/* Geo banner */}
      {!locationGranted && (
        <div className="bg-shop-red-soft border border-red-100 rounded-2xl p-4 flex items-center justify-between mb-6 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-shop-red rounded-xl flex items-center justify-center shrink-0">
              <Icon name="MapPin" size={20} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-shop-dark text-sm">Найти ближайший магазин</p>
              <p className="text-xs text-gray-500">Разрешите доступ к геолокации</p>
            </div>
          </div>
          <button
            onClick={handleGeo}
            disabled={locating}
            className="px-4 py-2 bg-shop-red text-white rounded-xl text-sm font-semibold hover:bg-shop-red-light transition-colors disabled:opacity-60"
          >
            {locating ? "Ищу..." : "Определить"}
          </button>
        </div>
      )}

      {locationGranted && (
        <div className="bg-shop-green-soft border border-green-100 rounded-2xl p-4 flex items-center gap-3 mb-6 animate-fade-in">
          <Icon name="CheckCircle" size={20} className="text-shop-green shrink-0" />
          <p className="text-sm text-shop-green font-medium">
            Геолокация определена — показаны ближайшие магазины
          </p>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-5">
        <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Поиск по адресу или названию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-shop-red"
        />
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        {/* Store list */}
        <div className="lg:col-span-2 space-y-3">
          {filtered.map((store, i) => (
            <button
              key={store.id}
              onClick={() => setSelected(store.id === selected ? null : store.id)}
              className={`w-full text-left rounded-2xl border-2 p-4 transition-all animate-fade-in ${
                selected === store.id
                  ? "border-shop-red bg-shop-red-soft"
                  : "border-gray-100 bg-white hover:border-shop-red/40"
              }`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className={`font-bold text-sm ${selected === store.id ? "text-shop-red" : "text-shop-dark"}`}>
                    {store.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{store.address}</p>
                </div>
                <div className="flex flex-col items-end gap-1 ml-2 shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-lg font-semibold ${
                    store.status === "open"
                      ? "bg-shop-green-soft text-shop-green"
                      : "bg-gray-100 text-gray-400"
                  }`}>
                    {store.status === "open" ? "Открыт" : "Закрыт"}
                  </span>
                  {locationGranted && (
                    <span className="text-xs text-gray-400">{store.distance}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                <Icon name="Clock" size={12} />
                {store.hours}
              </div>

              <div className="flex flex-wrap gap-1">
                {store.features.map((f) => (
                  <span
                    key={f}
                    className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-lg ${
                      selected === store.id
                        ? "bg-white/70 text-shop-red"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <Icon name={FEATURE_ICONS[f] as string} size={10} fallback="Check" />
                    {f}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Map placeholder / Store detail */}
        <div className="lg:col-span-3">
          {activeStore ? (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-scale-in">
              {/* Map stub */}
              <div className="relative bg-gradient-to-br from-green-100 via-green-50 to-blue-50 h-56 flex items-center justify-center overflow-hidden">
                {/* Decorative map grid */}
                <div className="absolute inset-0 opacity-30">
                  {Array.from({ length: 6 }).map((_, r) =>
                    Array.from({ length: 8 }).map((_, c) => (
                      <div
                        key={`${r}-${c}`}
                        className="absolute border border-gray-300"
                        style={{
                          left: `${c * 12.5}%`,
                          top: `${r * 16.6}%`,
                          width: "12.5%",
                          height: "16.6%",
                        }}
                      />
                    ))
                  )}
                </div>
                {/* Streets */}
                <div className="absolute inset-0">
                  <div className="absolute bg-white/80 h-4 w-full top-1/3" />
                  <div className="absolute bg-white/80 h-4 w-full top-2/3" />
                  <div className="absolute bg-white/80 w-4 h-full left-1/4" />
                  <div className="absolute bg-white/80 w-4 h-full left-2/3" />
                </div>
                {/* Pin */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-shop-red flex items-center justify-center shadow-lg animate-pulse-soft">
                    <Icon name="MapPin" size={24} className="text-white" />
                  </div>
                  <div className="mt-2 bg-white rounded-xl px-3 py-1 shadow text-xs font-bold text-shop-dark">
                    {activeStore.name}
                  </div>
                </div>
              </div>

              {/* Store info */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="font-bold text-shop-dark text-lg">{activeStore.name}</h3>
                  <p className="text-gray-500 text-sm">{activeStore.address}, {activeStore.city}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Icon name="Clock" size={16} className="text-shop-red shrink-0" />
                    {activeStore.hours}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Icon name="Phone" size={16} className="text-shop-red shrink-0" />
                    {activeStore.phone}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {activeStore.features.map((f) => (
                    <span
                      key={f}
                      className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-shop-green-soft text-shop-green rounded-xl font-medium"
                    >
                      <Icon name={FEATURE_ICONS[f] as string} size={14} fallback="Check" />
                      {f}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={`https://yandex.ru/maps/?text=${encodeURIComponent(activeStore.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 bg-shop-red text-white rounded-xl text-sm font-bold text-center hover:bg-shop-red-light transition-colors"
                  >
                    Построить маршрут
                  </a>
                  <a
                    href={`tel:${activeStore.phone}`}
                    className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-shop-red hover:text-shop-red transition-colors"
                  >
                    <Icon name="Phone" size={18} />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 h-full min-h-[320px] flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-2xl bg-shop-red-soft flex items-center justify-center mb-4">
                <Icon name="MapPin" size={32} className="text-shop-red" />
              </div>
              <p className="font-semibold text-shop-dark mb-1">Выберите магазин</p>
              <p className="text-sm text-gray-400">Нажмите на адрес слева, чтобы увидеть подробности и маршрут</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoresPage;
