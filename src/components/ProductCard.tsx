// src/components/ProductCard.tsx
import React from 'react';
import type { ProductCardProps } from '../types';
import StandardButton from './StandardButton';
import { useCurrency } from '../context/CurrencyContext';
import { currencyInfo } from '../types';

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) => {
  const { currentCurrency } = useCurrency();
  const { symbol } = currencyInfo[currentCurrency];
  const price = product.prices[currentCurrency];

  return (
    <div className="card h-100">
      <img
        src={product.imageUrl}
        className="card-img-top"
        alt={product.name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text flex-grow-1">{product.description}</p>
        <p className="card-text fw-bold">
          {price} {symbol}
        </p>

        <div className="mt-auto">
          <div className="d-grid gap-2 mb-2">
            <StandardButton
              BGcolor="primary"
              icon="basket-fill"
              title="Добавить в корзину"
              btnType="textButton"
              onClick={() => onAddToCart(product)}
              className="w-100"
            />
          </div>

          <div className="d-flex gap-2">
            <StandardButton
              BGcolor="info"
              icon="eye-fill"
              title="Подробнее"
              btnType="iconButton"
              onClick={() => onViewDetails(product)}
              className="flex-grow-1"
            />
            <StandardButton
              BGcolor="success"
              icon="dash-lg"
              title="−"
              btnType="iconButton"
              onClick={() => onDecreaseQuantity(product)}
            />
            <StandardButton
              BGcolor="warning"
              icon="plus-lg"
              title="+"
              btnType="iconButton"
              onClick={() => onIncreaseQuantity(product)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
