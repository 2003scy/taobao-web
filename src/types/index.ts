export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  shop: string;
  sales: number;
  location: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Address {
  id: number;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  isDefault: boolean;
}

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'completed';
  createdAt: string;
}

export interface UserAssets {
  redPacket: number;
  coupons: number;
  coins: number;
  points: number;
}

export interface User {
  id: number;
  username: string;
  phone: string;
  avatar: string;
  vipLevel: number;
  assets: UserAssets;
}
