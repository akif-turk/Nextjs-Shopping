import { Category, Subcategory, Product } from '@/constans';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { getCategories } from './getCategories';
import { slugify } from '@/lib/utils';

export async function getProducts(
  filter: Record<string, any> = {},
  sort: string[] = []
): Promise<Product[]> {
  try {
    const productRecords = await directus.request(
      readItems('products', { filter, sort })
    );

    const categoryRecords = (await directus.request(
      readItems('category')
    )) as Category[];

    const subcategoryRecords = (await directus.request(
      readItems('subcategory')
    )) as Subcategory[];

    const productFiles = await directus.request(readItems('product_Files'));

    const products: Product[] = productRecords.map((record) => {
      const category = categoryRecords.find(
        (cat: Category) => cat.id === record.category_id
      );

      const subcategory = subcategoryRecords.find(
        (subcat: Subcategory) => subcat.id === record.subcategory_id
      );

      const images = productFiles
        .filter((file) => file.product_id === record.id)
        .map((file) => file.directus_files_id);

      return {
        id: record.id,
        name: record.name,
        description: record.description,
        price: record.price,
        oldPrice: record.oldprice,
        isHome: record.isHome,
        images: images,
        category: category
          ? {
              id: category.id,
              name: category.name,
            }
          : null,
        subcategory: subcategory
          ? {
              id: subcategory.id,
              name: subcategory.name,
            }
          : null,
      };
    });

    return products;
  } catch (error) {
    console.error(
      'Error getting produts, categories, subcategories, and images',
      error
    );
    return [];
  }
}

export async function getProductsByCategory(
  categorySlug: string,
  subcategorySlug?: string
) {
  try {
    const categories = await getCategories();
    const category = categories.find(
      (cat: any) => slugify(cat.name) === categorySlug
    );

    if (!category) {
      console.error('Category no found');
      return [];
    }

    let subCategoryId = null;
    if (subcategorySlug && category.subcategories) {
      const subcategory = category.subcategories.find(
        (sub: any) => slugify(sub.name) === subcategorySlug
      );

      if (subcategory) {
        subCategoryId = subcategory.id;
      }
    }

    const filter: any = {
      category_id: { _eq: category.id },
    };

    if (subCategoryId) {
      filter.Subcategory_id = { _eq: subCategoryId };
    }

    const products = getProducts(filter);
    return products;
  } catch (error) {
    console.error('Error fetching product:', error);
    return [];
  }
}
