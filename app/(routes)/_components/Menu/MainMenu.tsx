import { Category, navLinks } from '@/constans';
import Link from 'next/link';

interface MainMenuProps {
  categories: Category[];
}

const MainMenu = ({}: MainMenuProps) => {
  return (
    <div className="flex lg:gap-8 xl-gap-12">
      {navLinks.slice(0.2).map((link, index) => (
        <Link
          href={link.href}
          key={index}
          className="hover:bg-orange-500 rounded-xl p-2 transition duration-500"
        >
          {link.label}
        </Link>
      ))}

      {navLinks.slice(4.6).map((link, index) => (
        <Link
          href={link.href}
          key={index}
          className="hover:bg-orange-500 rounded-xl p-2 transition duration-500"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default MainMenu;
