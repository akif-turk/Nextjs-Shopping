import { create } from 'zustand';

interface ProductFormState {
  quantity: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  reset: () => void;
}

export const useProductFormStore = create<ProductFormState>((set) => ({
  quantity: 1,
  incrementQuantity: () => set((state) => ({ quantity: state.quantity + 1 })),
  decrementQuantity: () =>
    set((state) => ({ quantity: Math.max(state.quantity - 1, 1) })),
  reset: () => set({ quantity: 1 }),
}));
