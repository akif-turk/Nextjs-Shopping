'use client';

import useCartStore from '@/hooks/use-cart';
import { ShoppingBag } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import CartItems from './CartItems';

const Cart = () => {
  const { items, fetchItems } = useCartStore();
  const { data: session } = useSession();
  const userId = session?.user.id;
  const token = session?.accessToken;

  useEffect(() => {
    if (userId && token) {
      fetchItems(userId, token);
    }
  }, [userId, token, fetchItems]);

  const totalQuantity = items.reduce((sum: number, item: any) => {
    const quantity =
      typeof item.quantity === 'object' ? item.quantity?.value : item.quantity;
    return sum + (Number(quantity) || 0);
  }, 0);

  const totalPrice = items.reduce((sum: number, item: any) => {
    const total =
      typeof item.total === 'object' ? item.total?.value : item.total;
    return sum + (Number(total) || 0);
  }, 0);

  return (
    <>
      <div className="hidden lg:flex">${totalPrice.toFixed(2)}</div>
      <div className="border relative bg-red-100 rounded-full p-2">
        <Sheet>
          <SheetTrigger>
            <div>
              <ShoppingBag className="text-orange-500" />
              <div
                className="absolute text-xs bg-orange-500 rounded-full text-white py-1 px-2
      -top-2 -right-3"
              >
                {totalQuantity}
              </div>
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Cart</SheetTitle>
            </SheetHeader>
            <CartItems
              items={items}
              session={session}
              token={token}
              totalPrice={totalPrice}
              user_id={userId}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Cart;
