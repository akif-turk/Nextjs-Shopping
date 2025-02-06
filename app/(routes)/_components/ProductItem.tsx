import React from 'react';
import { APIURL, Product } from '@/constans';
import Image from 'next/image';
import { Badge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ProductModal from './ProductModal';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="flex flex-col border border-slate-200 rounded-2xl">
      <div className="p-2 flex items-center justify-center">
        <Image
          alt={product.name}
          src={`${APIURL}/assets/${product.images?.[0] || 'default-image.jpg'}`}
          width={1000}
          height={1000}
          className="rounded-2xl w-32 h-auto"
        />
      </div>
      <div className="flex flex-col items-start mt-4 p-4 space-y-3">
        <h2 className="line-clamp-1 font-semibold">{product.name}</h2>
        {product.category && <Badge>{product.category.name}</Badge>}
        <div className="flex flex-row space-x-3">
          {product.oldPrice && (
            <span className="text-slate-400 line-through">
              ${product.oldPrice}
            </span>
          )}

          <span className="text bg-red-600 font-semibold">
            ${product.price}
          </span>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full bg-orange-500 hover:bg-orange-300 text-black font-semibold">
              Add to Cart
            </Button>
          </DialogTrigger>
          <DialogContent className="w-11/12 sm:max-w-[900px]">
            <DialogHeader>
              <DialogTitle>Einkaufen</DialogTitle>
            </DialogHeader>
            <ProductModal product={product} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProductItem;
