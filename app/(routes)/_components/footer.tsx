import { footerSection } from '@/constans';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className="bg-orange-500 px-8 py-12 text-white lg:px-64">
      <div>
        <div className="flex flex-col md:flex-row justify-between gap-8 py-12">
          <div className="w-full md:w-1/4">
            <Image
              alt="Logo"
              src="/logo.png"
              width={512}
              height={150}
              className="w-auto h-12 lg:h-14"
            />

            <p className="mt-2 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores ea reiciendis nemo deserunt eum maiores unde alias
            </p>
          </div>
          {footerSection.map((Section, index) => (
            <div key={index} className="w-full md:w-1/6">
              <h3 className="font-semibold text-lg text-black text-nowrap">
                {Section.title}
              </h3>
              <ul className="mt-2 space-y-1 text-sm">
                {Section.links.map((link, idx) => (
                  <li key={idx} className="hover:underline cursor-pointer">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-black my-5">
          <div className="flex flex-col md:flex-row justify-between items-center py-5 text-sm">
            <div>Copyright © 2025</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
