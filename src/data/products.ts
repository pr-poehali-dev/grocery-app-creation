import { Product } from "@/App";

export const CATEGORIES = [
  { id: "all", label: "Все", emoji: "🛒" },
  { id: "vegetables", label: "Овощи", emoji: "🥦" },
  { id: "fruits", label: "Фрукты", emoji: "🍎" },
  { id: "dairy", label: "Молочное", emoji: "🥛" },
  { id: "bakery", label: "Выпечка", emoji: "🍞" },
  { id: "meat", label: "Мясо", emoji: "🥩" },
  { id: "drinks", label: "Напитки", emoji: "🧃" },
  { id: "snacks", label: "Снэки", emoji: "🍿" },
];

export const PRODUCTS: Product[] = [
  { id: 1, name: "Томаты черри", price: 189, oldPrice: 240, category: "vegetables", image: "https://cdn.poehali.dev/projects/be0ae6b8-c324-45e6-b727-69418025e0b2/files/15ee50ac-4f16-42a9-80dd-2f20670348ae.jpg", unit: "500г", badge: "Акция", popular: true },
  { id: 2, name: "Огурцы свежие", price: 79, category: "vegetables", image: "https://cdn.poehali.dev/projects/be0ae6b8-c324-45e6-b727-69418025e0b2/files/15ee50ac-4f16-42a9-80dd-2f20670348ae.jpg", unit: "кг", popular: true },
  { id: 3, name: "Яблоки Гала", price: 119, oldPrice: 150, category: "fruits", image: "https://cdn.poehali.dev/projects/be0ae6b8-c324-45e6-b727-69418025e0b2/files/15ee50ac-4f16-42a9-80dd-2f20670348ae.jpg", unit: "кг", badge: "Хит", popular: true },
  { id: 4, name: "Молоко 3.2%", price: 89, category: "dairy", image: "https://cdn.poehali.dev/projects/be0ae6b8-c324-45e6-b727-69418025e0b2/files/4320a7e0-06d0-4169-96a7-6493660d434b.jpg", unit: "1л", popular: true },
  { id: 5, name: "Хлеб Бородинский", price: 65, category: "bakery", image: "https://cdn.poehali.dev/projects/be0ae6b8-c324-45e6-b727-69418025e0b2/files/c5d8f8c5-dc2e-4df9-8d3e-cac161b9d62a.jpg", unit: "шт", popular: true },
  { id: 6, name: "Сыр Российский", price: 349, oldPrice: 420, category: "dairy", image: "https://cdn.poehali.dev/projects/be0ae6b8-c324-45e6-b727-69418025e0b2/files/4320a7e0-06d0-4169-96a7-6493660d434b.jpg", unit: "300г", badge: "Акция", popular: true },
  { id: 7, name: "Бананы", price: 99, category: "fruits", image: "https://cdn.poehali.dev/projects/be0ae6b8-c324-45e6-b727-69418025e0b2/files/15ee50ac-4f16-42a9-80dd-2f20670348ae.jpg", unit: "кг" },
  { id: 8, name: "Кефир 2.5%", price: 72, category: "dairy", image: "https://cdn.poehali.dev/projects/be0ae6b8-c324-45e6-b727-69418025e0b2/files/4320a7e0-06d0-4169-96a7-6493660d434b.jpg", unit: "900мл" },
  { id: 9, name: "Перец болгарский", price: 149, oldPrice: 180, category: "vegetables", image: "https://cdn.poehali.dev/projects/be0ae6b8-c324-45e6-b727-69418025e0b2/files/15ee50ac-4f16-42a9-80dd-2f20670348ae.jpg", unit: "500г", badge: "Акция" },
  { id: 10, name: "Батон нарезной", price: 45, category: "bakery", image: "https://cdn.poehali.dev/projects/be0ae6b8-c324-45e6-b727-69418025e0b2/files/c5d8f8c5-dc2e-4df9-8d3e-cac161b9d62a.jpg", unit: "шт" },
  { id: 11, name: "Курица филе", price: 299, oldPrice: 349, category: "meat", image: "https://cdn.poehali.dev/projects/be0ae6b8-c324-45e6-b727-69418025e0b2/files/15ee50ac-4f16-42a9-80dd-2f20670348ae.jpg", unit: "кг", badge: "Хит" },
  { id: 12, name: "Сок апельсиновый", price: 139, category: "drinks", image: "https://cdn.poehali.dev/projects/be0ae6b8-c324-45e6-b727-69418025e0b2/files/15ee50ac-4f16-42a9-80dd-2f20670348ae.jpg", unit: "1л" },
  { id: 13, name: "Морковь", price: 39, category: "vegetables", image: "https://cdn.poehali.dev/projects/be0ae6b8-c324-45e6-b727-69418025e0b2/files/15ee50ac-4f16-42a9-80dd-2f20670348ae.jpg", unit: "кг" },
  { id: 14, name: "Творог 9%", price: 129, category: "dairy", image: "https://cdn.poehali.dev/projects/be0ae6b8-c324-45e6-b727-69418025e0b2/files/4320a7e0-06d0-4169-96a7-6493660d434b.jpg", unit: "250г" },
  { id: 15, name: "Чипсы Lay's", price: 119, oldPrice: 140, category: "snacks", image: "https://cdn.poehali.dev/projects/be0ae6b8-c324-45e6-b727-69418025e0b2/files/15ee50ac-4f16-42a9-80dd-2f20670348ae.jpg", unit: "150г", badge: "Акция" },
  { id: 16, name: "Вода минеральная", price: 49, category: "drinks", image: "https://cdn.poehali.dev/projects/be0ae6b8-c324-45e6-b727-69418025e0b2/files/15ee50ac-4f16-42a9-80dd-2f20670348ae.jpg", unit: "1.5л" },
];
