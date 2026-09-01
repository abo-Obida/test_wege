export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  badge?: "NEW" | "SALE" | "BEST SELLER";
  colors?: string[];
  description?: string;
  rating?: number;
  reviewCount?: number;
}

export interface WishlistItem {
  id: string;
  addedAt: Date;
}

export interface CartItem {
  productId: string;
  quantity: number;
  color?: string;
  size?: string;
}
