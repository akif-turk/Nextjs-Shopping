import { Product } from '@/constans';
import ProductItem from './ProductItem';

interface HomeProductProps {
  products: Product[];
}

const HomeProduct = ({ products }: HomeProductProps) => {
  return (
    <div className="mt-2 mb-12 flex flex-col px-4 lg:px-32 xl:px-64">
      <div>
        <h1 className="font-semibold text-3xl"> Featured Products</h1>

        <p className="text-sm text-slate-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
          neque.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {products?.length > 0 ? (
          products.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))
        ) : (
          <p> Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default HomeProduct;
