import React, { useState, useMemo } from 'react';
import type { Product } from './types';
import ProductCard from './components/ProductCard';
import { products } from './data';

const App: React.FC = () => {
  // Состояние для поискового запроса
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Правильная типизация обработчика изменений
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  // Фильтрация товаров с useMemo для оптимизации
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }
    
    const query = searchQuery.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Обработчики для кнопок
  const handleAddToCart = (product: Product): void => {
    console.log(`Товар "${product.name}" добавлен в корзину`);
  };

  const handleViewDetails = (product: Product): void => {
    console.log(`Просмотр деталей товара: ${product.name}`);
  };

  const handleIncreaseQuantity = (product: Product): void => {
    console.log(`Увеличено количество товара ${product.name}`);
  };

  const handleDecreaseQuantity = (product: Product): void => {
    console.log(`Уменьшено количество товара ${product.name}`);
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Магазин Рика и Морти</h1>
      
      {/* Поле поиска */}
      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <input
            type="text"
            className={`form-control ${searchQuery && filteredProducts.length === 0 ? 'is-invalid' : ''}`}
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

      {/* Отображение количества найденных товаров */}
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
        {filteredProducts.map(product => (
          <div key={product.id} className="col">
            <ProductCard
              product={product}
              onAddToCart={handleAddToCart}
              onViewDetails={handleViewDetails}
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