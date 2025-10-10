  import React from 'react';
  import Header from './Header';
  import { Outlet } from 'react-router-dom';
  import { useCart } from '../contexts/CartContext';

  const Layout: React.FC = () => {
    const { cartItems } = useCart();
    const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);

    return (
      <>
        <div className="container my-3">
          <Header cartItemCount={totalItems} />
        </div>

        <main className="container mb-5">
          <Outlet />
        </main>

        <footer className="text-center py-4 text-muted">
          &copy; {new Date().getFullYear()} Rick & Morty Store — учебный проект
        </footer>
      </>
    );
  };

  export default Layout;
