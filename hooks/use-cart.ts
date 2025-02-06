import { getToCart } from '@/actions/product/getToCart';
import { create } from 'zustand';

const useCartStore = create((set) => ({
  items: [],
  fetchItems: async (userId: any, token: any) => {
    const data = await getToCart(userId, token);
    set({ items: data });
  },
}));

export default useCartStore;
