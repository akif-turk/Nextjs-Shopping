import tokendirectus from '@/lib/tokendirectus';
import { createItem } from '@directus/sdk';

export const creatOrder = async (data: any, token: string) => {
  const directus = tokendirectus(token);

  const order = await directus.request(
    createItem('order', {
      user_id: data.user_id,
      totalPrice: data.tottalPrice,
      orderStatus: 'pending',
      status: 'published',
    })
  );

  const orderItems = await Promise.all(
    data.items.map(async (item: any) => {
      return directus.request(
        createItem('orderitem', {
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
          total: data.totalPrice,
          status: 'published',
        })
      );
    })
  );
  return { order, orderItems };
};
