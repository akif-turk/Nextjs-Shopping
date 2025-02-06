import React from 'react';
import { APIURL, Product } from '@/constans';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import ProductForm from './ProductForm';

interface ProductModalProps {
  product: Product;
}

const ProductModal = ({ product }: ProductModalProps) => {
  return (
    <div className=" w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 p-7 gap-5">
        <div className=" flex flex-col gap-3 ">
          <h2 className="text text-3xl font-semibold">{product.name}</h2>
          <h2>{product.category && <Badge>{product.category.name}</Badge>}</h2>

          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>

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
        </div>

        <div className="flex justify-center items-center">
          <Carousel>
            <CarouselContent>
              {product.images?.map((image, index) => (
                <CarouselItem key={index}>
                  <Image
                    alt={product.name}
                    src={`${APIURL}/assets/${
                      product.images?.[index] || 'default-image.jpg'
                    }`}
                    width={1000}
                    height={1000}
                    className="rounded-2xl w-full h-auto"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>

        <div>
          <ProductForm product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
