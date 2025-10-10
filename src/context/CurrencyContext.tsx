// src/context/CurrencyContext.tsx
import React, { createContext, useContext, useState } from "react";
import type { Currency, CurrencyContextType } from "../types";

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCurrency, setCurrency] = useState<Currency>("shmeckles");

  return (
    <CurrencyContext.Provider value={{ currentCurrency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within a CurrencyProvider");
  return context;
};
