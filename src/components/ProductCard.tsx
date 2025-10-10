import React from "react";
import type { ProductCardProps, Currency } from "../types";
import StandardButton from "./StandardButton";
import { useCurrency } from "../contexts/CurrencyContext";
import { currencyInfo } from "../types";

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) => {
  const { currency } = useCurrency();
  const symbol = currencyInfo[currency as Currency].symbol;
  const price = product.prices[currency as Currency];

  return (
    <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
      <div className="position-relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="card-img-top"
          style={{ height: 200, objectFit: "cover" }}
        />
        <span className="position-absolute top-0 end-0 m-2 px-2 py-1 bg-warning text-dark fw-bold rounded">
          {price.toFixed(2)} {symbol}
        </span>
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate">{product.name}</h5>
        <p className="card-text text-muted flex-grow-1" style={{ fontSize: "0.9rem" }}>
          {product.description}
        </p>

        <div className="mt-auto">
          <div className="d-grid gap-2 mb-2">
            <StandardButton
              BGcolor="primary"
              icon="basket-fill"
              title="Добавить в корзину"
              btnType="textButton"
              onClick={() => onAddToCart(product)}
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
