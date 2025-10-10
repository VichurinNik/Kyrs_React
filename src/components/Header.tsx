// src/components/Header.tsx
import React from "react";
import { useCurrency } from "../context/CurrencyContext";
import { currencyInfo } from "../types";

interface HeaderProps {
  cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount }) => {
  const { currentCurrency, setCurrency } = useCurrency();

  return (
    <header className="d-flex justify-content-between align-items-center mb-4">
      <h2>🛒 Rick & Morty Store</h2>

      <div className="d-flex align-items-center gap-3">
        {/* 🔄 Селектор валюты */}
        <select
          className="form-select form-select-sm w-auto"
          value={currentCurrency}
          onChange={(e) => setCurrency(e.target.value as keyof typeof currencyInfo)}
        >
          <option value="shmeckles">₴ Шмекели</option>
          <option value="credits">₢ Кредиты</option>
          <option value="flurbos">♦ Флурбо</option>
        </select>

        {/* 🧺 Корзина */}
        <button className="btn btn-outline-primary position-relative">
          <i className="bi bi-cart4"></i>
          {cartItemCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
