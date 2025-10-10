
export type Currency = "shmeckles" | "credits" | "flurbos";


export interface CurrencyPrices {
  shmeckles: number;
  credits: number;
  flurbos: number;
}


export const currencyInfo = {
  shmeckles: { symbol: "₴", name: "Шмекели" },
  credits: { symbol: "₢", name: "Кредиты" },
  flurbos: { symbol: "♦", name: "Флурбо" },
} as const;


export type BSColors =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "secondary"
  | "dark"
  | "light";

export interface CurrencyContextType {
  currentCurrency: Currency;
  setCurrency: (currency: Currency) => void;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  category: string;

  
  prices: CurrencyPrices;
}


export interface CartItem extends Product {
  quantity: number;
}


export interface StandardButtonProps {
  BGcolor: BSColors;
  icon?: string;
  title: string;
  btnType: "textButton" | "iconButton";
  onClick: () => void;
  className?: string;
}


export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onIncreaseQuantity: (product: Product) => void;
  onDecreaseQuantity: (product: Product) => void;
}
