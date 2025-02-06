'use client';

import { getProducts } from '@/actions/getProduct';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import useCartStore from '@/hooks/use-cart';
import { creatOrder } from '@/actions/order/createOrder';
import { deleteFromCart } from '@/actions/order/deleteFromCart';

interface CartItemProps {
  items: any[];
  user_id: string;
  token: string;
  totalPrice: number;
  session: any;
}

const CartItems = ({
  items,
  session,
  token,
  totalPrice,
  user_id,
}: CartItemProps) => {
  const [productDetails, setProductDetails] = useState<any[]>([]);
  const { toast } = useToast();
  const fetchItems = useCartStore((state) => state.fetchItems);

  useEffect(() => {
    const loadProductDetails = async () => {
      const details = await Promise.all(
        items.map(async (item) => {
          const filter = { id: { _eq: item.product_id } };
          const products = await getProducts(filter);
          const product = products[0];
          return { ...item, details: product };
        })
      );
      setProductDetails(details);
    };
    loadProductDetails();
  }, [items]);

  if (items.length === 0) {
    return <p className="text-gray-500 "> Your cart is empty</p>;
  }

  const handleCheckout = async () => {
    try {
      await creatOrder({ user_id, items, totalPrice }, token);

      await deleteFromCart(user_id, token);
      toast({
        title: 'Success',
        description: 'Order Success',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Order Error',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className=" space-y-4">
      {productDetails.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
        >
          <div className="flex-1 px-4">
            <h3 className="text-lg font-medium">{item.details?.name}</h3>
            <p className="text-sm text-gray-500">Quantity{item.quantity}</p>
          </div>
          {item.details && (
            <p className="text-sm text-gray-500">
              Category:{item.details?.category?.name}
            </p>
          )}

          <div className="text-right">
            <p className="text-gray-600">
              ${Number(item.details?.price).toFixed(2)}
            </p>
          </div>
        </div>
      ))}

      <Button onClick={handleCheckout}>Checkout</Button>
    </div>
  );
};

export default CartItems;
