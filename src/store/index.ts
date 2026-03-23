import { create } from 'zustand';
import type { Product, CartItem, Address, User } from '../types';

interface AppState {
  // 用户信息
  user: User;

  // 购物车
  cart: CartItem[];
  addToCart: (product: Product, color?: string, size?: string) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // 收藏
  favorites: number[];
  toggleFavorite: (id: number) => void;

  // 地址
  addresses: Address[];
  currentAddress: Address | null;

  // 搜索
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // 当前商品
  currentProduct: Product | null;
  setCurrentProduct: (product: Product | null) => void;

  // 当前页面
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const initialUser: User = {
  id: 1,
  username: 'Tom123',
  phone: '138****8888',
  avatar: '',
  vipLevel: 3,
  assets: {
    redPacket: 128.5,
    coupons: 5,
    coins: 386,
    points: 120,
  },
};

const initialAddresses: Address[] = [
  {
    id: 1,
    name: '张三',
    phone: '138****8888',
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    detail: '科技园南路88号XX大厦A座1001室',
    isDefault: true,
  },
];

export const useAppStore = create<AppState>((set, get) => ({
  user: initialUser,

  cart: [],

  addToCart: (product, color, size) => {
    set((state) => {
      const existing = state.cart.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === existing.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        cart: [
          ...state.cart,
          {
            id: Date.now(),
            product,
            quantity: 1,
            selectedColor: color,
            selectedSize: size,
          },
        ],
      };
    });
  },

  removeFromCart: (id) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }));
  },

  updateQuantity: (id, quantity) => {
    if (quantity < 1) return;
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => set({ cart: [] }),

  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  },

  getCartCount: () => {
    const { cart } = get();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  favorites: [],

  toggleFavorite: (id) => {
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((fId) => fId !== id)
        : [...state.favorites, id],
    }));
  },

  addresses: initialAddresses,

  currentAddress: initialAddresses[0],

  searchQuery: '',

  setSearchQuery: (query) => set({ searchQuery: query }),

  currentProduct: null,

  setCurrentProduct: (product) => set({ currentProduct: product }),

  currentPage: 'home',

  setCurrentPage: (page) => set({ currentPage: page }),
}));
