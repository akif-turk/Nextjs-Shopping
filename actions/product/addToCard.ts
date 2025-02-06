import tokendirectus from '@/lib/tokendirectus';
import { createItem } from '@directus/sdk';

export const addToCart = async (data: any, token: string) => {
  const directus = tokendirectus(token);
  const response = await directus.request(
    createItem('cart', {
      user_id: data.user_id,
      product_id: data.product_id,
      quantity: data.quantity,
      price: data.ProductItem,
      total: data.total,
    })
  );
  return response;
};
