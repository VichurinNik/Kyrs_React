import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Layout from "./components/Layout";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./contexts/CartContext";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <CurrencyProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<App />} />
              <Route path="cart" element={<CartPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </CurrencyProvider>
  </React.StrictMode>
);
