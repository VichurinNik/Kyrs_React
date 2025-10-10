import React, { createContext, useContext, useState } from 'react';
import type { CartItem, Product } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const found = prev.find(i => i.id === product.id);
      if (found) {
        return prev.map(i => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (productId: number) => {
    setCartItems(prev => prev.map(i => (i.id === productId ? { ...i, quantity: i.quantity + 1 } : i)));
  };

  const decreaseQuantity = (productId: number) => {
    setCartItems(prev =>
      prev
        .map(i => (i.id === productId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter(i => i.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, increaseQuantity, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
