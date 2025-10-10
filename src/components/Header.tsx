import React from "react";
import { useCurrency } from "../contexts/CurrencyContext";

interface HeaderProps {
  cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount }) => {
  const { currency, setCurrency, symbol } = useCurrency();

  return (
    <header className="d-flex justify-content-between align-items-center mb-4">
      <h3>
        🛒 Корзина: {cartItemCount} шт. ({symbol})
      </h3>
      <div>
        <select
          className="form-select"
          style={{ width: "150px" }}
          value={currency}
          onChange={(e) => setCurrency(e.target.value as any)}
        >
          <option value="shmeckles">₴ Шмекели</option>
          <option value="credits">₢ Кредиты</option>
          <option value="flurbos">♦ Флурбо</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
