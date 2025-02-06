import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="hidden lg:block w-1/2 h-full">
        <Image
          alt="login"
          src="/auth.jpg"
          width={1080}
          height={1920}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="w-full lg:h-1/2 p-10 flex flex-col items-center">
        <div className="flex items-center mb-6">
          <div className="py-4 px-3">
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
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
