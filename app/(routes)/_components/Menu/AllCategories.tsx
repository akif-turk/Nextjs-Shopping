import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSub,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Menu } from 'lucide-react';
import { APIURL, Category } from '@/constans';
import Image from 'next/image';
import Link from 'next/link';
import { slugify } from '@/lib/utils';

interface AllCategoriesProps {
  categories: Category[];
}

const AllCategories = ({ categories }: AllCategoriesProps) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex flex-row items-center gap-3 text-white bg-orange-500 px-8 rounded-2xl py-3 cursor-pointer">
            <Menu />
            AllCategories
            <ChevronDown />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-60 text-slate-600 mt-3">
          <DropdownMenuGroup>
            {categories.length > 0 ? (
              categories.map((category) =>
                Array.isArray(category.subcategories) &&
                category.subcategories.length > 0 ? (
                  <DropdownMenuSub key={category.id}>
                    <DropdownMenuSubTrigger className="p-3">
                      <Link
                        href={`/categories/${slugify(category.name)}`}
                        key={category.id}
                      >
                        <div className="flex flex-row items-center">
                          <Image
                            src={`${APIURL}/assets/${category.icon}`}
                            alt=""
                            width={50}
                            height={50}
                            className="w-8 h-8"
                          />
                          {category.name}
                        </div>
                      </Link>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-60 text-orange-500 ml-1">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          href={`/category/${slugify(category.name)}/${slugify(
                            subcategory.name
                          )}`}
                          key={subcategory.id}
                        >
                          <DropdownMenuItem className="p-3">
                            {subcategory.name}
                          </DropdownMenuItem>
                        </Link>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                ) : (
                  <Link
                    href={`/categories/${slugify(category.name)}`}
                    key={category.id}
                  >
                    <DropdownMenuItem className="p-3">
                      <Image
                        src={`${APIURL}/assets/${category.icon}`}
                        alt=""
                        width={50}
                        height={50}
                        className="w-8 h-8"
                      />

                      {category.name}
                    </DropdownMenuItem>
                  </Link>
                )
              )
            ) : (
              <DropdownMenuItem>No categories available</DropdownMenuItem>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="text-xs">Nev Arrivals</DropdownMenuItem>
          <DropdownMenuItem className="text-xs">
            Value of the Day
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AllCategories;
