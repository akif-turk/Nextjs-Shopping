'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const UserButton = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }
  return (
    <div>
      {session ? (
        <div className="flex flex-row gap-2 items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger className=" flex flex-row items-center justify-center gap-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {session.user?.first_name};
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>

              <DropdownMenuItem onClick={() => signOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Link href={'/auth/login'}>
          <div className="border rounded-full p-2">
            <User />
          </div>
        </Link>
      )}
    </div>
  );
};

export default UserButton;
