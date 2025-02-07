import Link from 'next/link';
import MainMenu from './MainMenu';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Cart from './Cart';
import AllCategories from './AllCategories';
import MobileMenu from './MobileMenu';
import Image from 'next/image';
import { Category } from '@/constans';
import { getCategories } from '@/actions/getCategories';
import UserButton from './UserButton';

const Header = async () => {
  const categories: Category[] = await getCategories();

  return (
    <div className="flex flex-col">
      <div className="h-6 lg:h-8 bg-orange-500 text-center flex items-center justify-center">
        <p className=" text-white text-xs lg:text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
          repellendus?
        </p>
      </div>
      <div className="border-b hidden lg:flex lg:px-32 xl:px-64">
        <div className="container mx-auto">
          <div className="flex flex-row justify-between items-center text-xs text-slate-500 p-3">
            <div className="flex flex-row gap-6 font-bold">
              <Link href="/">About Us</Link>
              <Link href="/">My Account</Link>
              <Link href="/">Wishlist</Link>
            </div>
            <div className="hidden lg:block text-center">
              <p className="font-bold">
                100% Secure delivery without contacting
              </p>
            </div>
            <div className="flex flex-row gap-2 font-bold">
              <span className="text-orange-500">Need Help? Call Us</span>
              <span className="font-extrabold">+ 90 500 000 155</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b lg:border-none flex px-4 mr-2 ml-2 lg:px-32 xl:px-64 justify-between items-center py-4">
        <div className="flex lg:hidden">
          <MobileMenu />
        </div>
        <div className="text-2xl font-semibold">
          <Link href={'/'}>
            <Image
              alt="Logo"
              src="/logo.png"
              width={512}
              height={150}
              className="w-auto h-12 lg:h-14"
            />
          </Link>
        </div>
        <div className="hidden lg:flex mx-4 relative">
          <Input
            className="bg-slate-100 lg:w-[450px] 2xl:w-[700px] text-sm py-6"
            placeholder="Searc for products..."
          />
          <Search className="absolute right-3 top-3" />
        </div>

        <div className="text-base flex flex-row items-center gap-3 lg:gap-6 font-semibold">
          <UserButton></UserButton>

          <div className="hidden lg:flex"></div>
          <Cart />
        </div>
      </div>

      <div className="hidden lg:flex py-4 border-b flex-row lg:px-32 xl:px-64 mx-2 items-center justify-between">
        <AllCategories categories={categories} />
        <MainMenu categories={categories} />
      </div>
    </div>
  );
};

export default Header;
