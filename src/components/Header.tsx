import React from 'react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick?: () => void; 
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  return (
    <header className="d-flex justify-content-between align-items-center mb-4">
      <h1>Магазин Рика и Морти</h1>
      <div style={{ cursor: onCartClick ? 'pointer' : 'default' }} onClick={onCartClick}>
        🛒 <span className="badge bg-danger">{cartItemCount}</span>
      </div>
    </header>
  );
};

export default Header;
