import React from 'react';
import type  { Product } from '../data'; // Импортируем интерфейс

// Определяем интерфейс для пропсов самого компонента
interface ProductCardProps {
  product: Product; // Пропс "product" должен быть типа "Product"
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  // Обработчик клика по кнопке
  const handleAddToCartClick = () => {
    console.log(`Товар "${product.name}" добавлен в корзину. Его цена: ${product.price} шмеклей.`);
  };

  return (
    <div className="card">
      {/* Изображение: путь начинается с /images, т.к. папка лежит в public */}
      <img src={product.imageUrl} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p><strong>Цена: {product.price} шмеклей</strong></p>
      {/* Вешаем обработчик на кнопку */}
      <button onClick={handleAddToCartClick}>Добавить в корзину</button>
    </div>
  );
};

export default ProductCard;