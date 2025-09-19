import React from 'react';
import type { Product } from './types';
import ProductCard from './components/ProductCard';
import { products } from './data'; // меняем импорт с data/data на data

const App: React.FC = () => {
  const handleAddToCart = (product: Product) => {
    console.log(`Товар "${product.name}" добавлен в корзину`);
  };

  const handleViewDetails = (product: Product) => {
    console.log(`Просмотр деталей товара: ${product.name}`);
  };

  const handleIncreaseQuantity = (product: Product) => {
    console.log(`Увеличено количество товара ${product.name}`);
  };

  const handleDecreaseQuantity = (product: Product) => {
    console.log(`Уменьшено количество товара ${product.name}`);
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Магазин Рика и Морти</h1>
      
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map(product => (
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