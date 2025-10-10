import React, { useState, useMemo } from "react";
import type { Product, CartItem } from "./types";
import ProductCard from "./components/ProductCard";
import { products } from "./data";

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const query = searchQuery.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

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

  const handleIncreaseQuantity = (product: Product) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

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

  return (
    <div className="container my-4">
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
              Извините, по вашему запросу "{searchQuery}" ничего не найдено 😢
            </div>
          )}
        </div>
      </div>

      {/* Количество найденных товаров */}
      {searchQuery && (
        <div className="row mb-3">
          <div className="col text-center">
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
              onViewDetails={(p) => console.log("Просмотр товара:", p)}
              onIncreaseQuantity={handleIncreaseQuantity}
              onDecreaseQuantity={handleDecreaseQuantity}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
