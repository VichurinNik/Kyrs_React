export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string; 
  category: string;
}

export type BSColors = "primary" | "success" | "warning" | "danger" | "info" | "secondary" | "dark" | "light";

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