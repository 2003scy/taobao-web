import { create } from 'zustand';
import { api } from '../api';
import type { Product, CartItem, Address } from '../types';

interface User {
  id: number;
  username: string;
  phone: string;
  vipLevel: number;
  assets: {
    redPacket: number;
    coupons: number;
    coins: number;
    points: number;
  };
}

interface AppState {
  // 用户信息
  user: User | null;
  fetchUser: () => Promise<void>;

  // 商品
  products: Product[];
  fetchProducts: (params?: { search?: string; sort?: string }) => Promise<void>;
  currentProduct: Product | null;
  setCurrentProduct: (product: Product | null) => void;

  // 搜索
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // 购物车
  cart: CartItem[];
  fetchCart: () => Promise<void>;
  addToCart: (
    product: Product,
    color?: string,
    size?: string,
    quantity?: number
  ) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartCount: () => number;

  // 收藏
  favorites: number[];
  toggleFavorite: (id: number) => void;

  // 地址
  addresses: Address[];
  currentAddress: Address | null;
  fetchAddresses: () => Promise<void>;

  // 消息
  messages: any[];
  fetchMessages: () => Promise<void>;

  // 营销活动
  promotions: any[];
  fetchPromotions: () => Promise<void>;

  // 当前页面
  currentPage: string;
  setCurrentPage: (page: string) => void;

  // 加载状态
  loading: boolean;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  fetchUser: async () => {
    try {
      const user = await api.user.info();
      set({ user });
    } catch (e) {
      console.error('获取用户信息失败', e);
    }
  },

  products: [],
  fetchProducts: async (params) => {
    try {
      set({ loading: true });
      const products = await api.products.list(params);
      set({ products, loading: false });
    } catch (e) {
      console.error('获取商品失败', e);
      set({ loading: false });
    }
  },

  currentProduct: null,
  setCurrentProduct: (product) => set({ currentProduct: product }),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  cart: [],
  fetchCart: async () => {
    try {
      const cart = await api.cart.list();
      set({ cart });
    } catch (e) {
      console.error('获取购物车失败', e);
    }
  },

  addToCart: async (product, color, size, quantity = 1) => {
    try {
      await api.cart.add({ product, quantity, selectedColor: color, selectedSize: size });
      await get().fetchCart();
    } catch (e) {
      console.error('添加购物车失败', e);
    }
  },

  removeFromCart: async (id) => {
    try {
      await api.cart.remove(id);
      await get().fetchCart();
    } catch (e) {
      console.error('删除购物车失败', e);
    }
  },

  updateQuantity: async (id, quantity) => {
    try {
      await api.cart.update(id, quantity);
      await get().fetchCart();
    } catch (e) {
      console.error('更新数量失败', e);
    }
  },

  clearCart: async () => {
    try {
      await api.cart.clear();
      set({ cart: [] });
    } catch (e) {
      console.error('清空购物车失败', e);
    }
  },

  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
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

  addresses: [],
  currentAddress: null,
  fetchAddresses: async () => {
    try {
      const addresses = await api.user.addresses();
      set({
        addresses,
        currentAddress: addresses.find((a: Address) => a.isDefault) || addresses[0] || null,
      });
    } catch (e) {
      console.error('获取地址失败', e);
    }
  },

  messages: [],
  fetchMessages: async () => {
    try {
      const messages = await api.messages.list();
      set({ messages });
    } catch (e) {
      console.error('获取消息失败', e);
    }
  },

  promotions: [],
  fetchPromotions: async () => {
    try {
      const promotions = await api.promotions.list();
      set({ promotions });
    } catch (e) {
      console.error('获取营销活动失败', e);
    }
  },

  currentPage: 'home',
  setCurrentPage: (page) => set({ currentPage: page }),

  loading: false,
}));
