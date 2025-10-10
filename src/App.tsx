import React, { useState, useMemo } from "react";
import type { Product, CartItem } from "./types";
import ProductCard from "./components/ProductCard";
import Header from "./components/Header";
import { products } from "./data";
import { CurrencyProvider } from "./context/CurrencyContext";

const App: React.FC = () => {
  // 🛒 Состояние корзины
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 🔍 Состояние поиска
  const [searchQuery, setSearchQuery] = useState<string>("");

  // --- Обработчик изменения поискового запроса ---
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // --- Фильтрация товаров по имени или описанию ---
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const query = searchQuery.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // --- Добавление товара в корзину ---
  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // --- Увеличение количества товара ---
  const handleIncreaseQuantity = (product: Product) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // --- Уменьшение количества товара ---
  const handleDecreaseQuantity = (product: Product) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // --- Подсчёт общего количества товаров ---
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    // 💱 Оборачиваем всё приложение в CurrencyProvider,
    // чтобы можно было менять валюту из любого компонента
    <CurrencyProvider>
      <div className="container my-4">
        {/* Header с выбором валюты и количеством товаров */}
        <Header cartItemCount={totalItems} />

        <h1 className="text-center mb-4">🛍️ Магазин Рика и Морти</h1>

        {/* Поле поиска */}
        <div className="row mb-4">
          <div className="col-md-6 mx-auto">
            <input
              type="text"
              className={`form-control ${
                searchQuery && filteredProducts.length === 0 ? "is-invalid" : ""
              }`}
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && filteredProducts.length === 0 && (
              <div className="invalid-feedback d-block">
                Извините, по вашему запросу "{searchQuery}" ничего не найдено
              </div>
            )}
          </div>
        </div>

        {/* Количество найденных товаров */}
        {searchQuery && (
          <div className="row mb-3">
            <div className="col">
              <p className="text-muted">
                Найдено товаров: {filteredProducts.length}
              </p>
            </div>
          </div>
        )}

        {/* Галерея товаров */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col">
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetails={(product) =>
                  console.log("Просмотр товара:", product)
                }
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
              />
            </div>
          ))}
        </div>
      </div>
    </CurrencyProvider>
  );
};

export default App;
