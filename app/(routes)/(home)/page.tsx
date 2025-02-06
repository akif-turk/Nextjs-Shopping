import { getSlider } from '@/actions/getSlider';
import { Product, SliderItem } from '@/constans';
import Hero from '../_components/Hero';
import { getProducts } from '@/actions/getProduct';
import HomeProduct from './../_components/HomeProduct';

export default async function Home() {
  const slider: SliderItem[] = await getSlider();
  const products: Product[] = await getProducts(
    {
      isHome: { _eq: true },
    },

    ['-price']
  );
  return (
    <div>
      <Hero slider={slider} />
      <HomeProduct products={products} />
    </div>
  );
}
