import { getProductsByCategory } from '@/actions/getProduct';
import ProductItem from '../../ProductItem';

const CategoriesDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;

  const categorySlug = slug[0];
  const subcategorySlug = slug[1];

  const products = await getProductsByCategory(categorySlug, subcategorySlug);

  return (
    <div className="mt-12 mb-4 px-4 lg:px-32 xl:px-64">
      {products?.length > 0 ? (
        products.slice(0, 1).map((product) => (
          <div key={product.id}>
            <h2 className="text text-3xl font-semibold">
              {product.category?.name}
            </h2>
            <p className="text-slate-600 mt-1">
              {product.subcategory && product.subcategory?.name}
            </p>
          </div>
        ))
      ) : (
        <p> Loading products...</p>
      )}

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

export default CategoriesDetailPage;
