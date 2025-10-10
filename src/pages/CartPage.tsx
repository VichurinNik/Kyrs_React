import React from "react";
import { useCart } from "../contexts/CartContext";
import { useCurrency } from "../contexts/CurrencyContext";
import { currencyInfo } from "../types";
import type { Currency } from "../types";

import { Link } from "react-router-dom";

const CartPage: React.FC = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const { currency } = useCurrency(); // ✅ исправлено
  const symbol = currencyInfo[currency as Currency].symbol;

  const total = cartItems.reduce((sum, item) => {
    const price = item.prices[currency as Currency];
    return sum + price * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div>
        <h3>Ваша корзина пуста</h3>
        <p>
          <Link to="/">Перейти в каталог</Link> и добавьте товары.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3>Корзина</h3>
      <div className="list-group mb-3">
        {cartItems.map((item) => {
          const price = item.prices[currency as Currency];
          return (
            <div key={item.id} className="list-group-item d-flex gap-3 align-items-center">
              <img src={item.imageUrl} alt={item.name} style={{ width: 80, height: 80, objectFit: "cover" }} />
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between">
                  <strong>{item.name}</strong>
                  <span>{(price * item.quantity).toFixed(2)} {symbol}</span>
                </div>
                <div className="text-muted small">{item.category}</div>
                <div className="mt-2 d-flex align-items-center gap-2">
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <button className="btn btn-danger me-2" onClick={clearCart}>Очистить корзину</button>
          <Link to="/" className="btn btn-outline-secondary">Продолжить покупки</Link>
        </div>

        <div>
          <h5>Итого: {total.toFixed(2)} {symbol}</h5>
          <button className="btn btn-success">Оформить заказ</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
