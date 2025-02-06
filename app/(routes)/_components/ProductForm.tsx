'use client';
import { Button } from '@/components/ui/button';
import { Product } from '@/constans';
import { useProductFormStore } from '@/hooks/use-form';
import { useToast } from '@/hooks/use-toast';
import { Loader2Icon, Minus, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { addToCart } from '@/actions/product/addToCard';
import useCartStore from '@/hooks/use-cart';

interface ProductFormProps {
  product: Product;
}

const ProductForm = ({ product }: ProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { decrementQuantity, incrementQuantity, quantity, reset } =
    useProductFormStore();

  useEffect(() => {
    reset();
  }, [product]);

  const TotalPrice = (quantity * product.price).toFixed(2);

  const { data: session, status } = useSession();

  const fetchItems = useCartStore((state) => state.fetchItems);

  const onAddCart = async () => {
    if (!session && !session?.accessToken) {
      router.push('/auth/login');
      router.refresh();
    } else {
      try {
        setLoading(true);

        const cartData = {
          user_id: session?.user.id,
          product_id: product.id,
          quantity: quantity,
          price: product.price,
          total: TotalPrice,
        };
        const token = session?.accessToken;

        await addToCart(cartData, token)
          .then((response) => {
            console.log('Product Added to Cart', response);
            toast({
              title: 'Succes',
              description: 'Add to Cart',
              variant: 'success',
            });
            fetchItems(session?.user.id, token);
          })
          .catch((error) => {
            console.log('Error Added to Cart', error);

            toast({
              title: 'Error',
              description: 'Add to Cart',
              variant: 'destructive',
            });
          });
      } catch (error) {
        console.log('error', error);
        toast({
          title: 'Error',
          description: 'Add to Cart',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return;
  <>
    <div className="flex flex-row items-center gap-4 mt-8">
      <Button disabled={quantity === 1} onClick={decrementQuantity}>
        <Minus />
      </Button>
      <h2>{quantity}</h2>
      <Button onClick={incrementQuantity}>
        <PlusIcon />
      </Button>
      ${TotalPrice}
    </div>

    <div className=" flex flex-row gap-2 mt-8">
      <Button
        onClick={onAddCart}
        className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold"
      >
        {loading ? <Loader2Icon className="animate-spin" /> : 'Add to cart'}
      </Button>
    </div>
  </>;
};

export default ProductForm;
