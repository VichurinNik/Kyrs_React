import React, { createContext, useState, useContext } from "react";
import type { Currency } from "../types";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>("shmeckles");

  const symbols: Record<Currency, string> = {
    shmeckles: "₴",
    credits: "₢",
    flurbos: "♦",
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, symbol: symbols[currency] }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used inside CurrencyProvider");
  return context;
};
