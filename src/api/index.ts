const API_BASE = 'http://localhost:3001/api';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${url}`, options);
  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || '请求失败');
  }

  return data.data;
}

export const api = {
  // 商品
  products: {
    list: (params?: { search?: string; category?: string; sort?: string }) => {
      const query = new URLSearchParams(params as Record<string, string>).toString();
      return request<any[]>(`/products${query ? `?${query}` : ''}`);
    },
    get: (id: number) => request<any>(`/products/${id}`),
  },

  // 购物车
  cart: {
    list: () => request<any[]>('/cart'),
    add: (item: {
      product: any;
      quantity: number;
      selectedColor?: string;
      selectedSize?: string;
    }) =>
      request<any[]>('/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      }),
    update: (id: number, quantity: number) =>
      request<any[]>(`/cart/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      }),
    remove: (id: number) =>
      request<any[]>(`/cart/${id}`, {
        method: 'DELETE',
      }),
    clear: () =>
      request<any[]>('/cart', {
        method: 'DELETE',
      }),
  },

  // 订单
  orders: {
    submit: (order: {
      items: any[];
      total: number;
      address: any;
      payment: string;
    }) =>
      request<any>('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      }),
  },

  // 用户
  user: {
    info: () => request<any>('/user'),
    addresses: () => request<any[]>('/addresses'),
  },

  // 消息
  messages: {
    list: () => request<any[]>('/messages'),
  },

  // 营销活动
  promotions: {
    list: () => request<any[]>('/promotions'),
  },
};
