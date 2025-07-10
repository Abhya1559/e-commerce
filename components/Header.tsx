import { headerData } from '@/constants';
import { Search, ShoppingCart, User2Icon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { isLoggedIn } from '@/lib/session';
import LogoutButton from './controls/LogoutButton';

export default async function Navbar() {
  const loggedIn = await isLoggedIn();

  return (
    <div>
      <nav className="ms-auto flex w-[100%] items-center justify-between gap-10 border bg-white p-6 shadow-md">
        <div className="text-left">
          <Link href="/" className="font-serif text-3xl font-semibold text-gray-800">
            Sport.co.India
          </Link>
        </div>
        <div className="flex gap-5">
          {' '}
          {headerData?.map(item => (
            <Link
              key={item.title}
              href={item.href}
              className="font-semibold text-gray-700 transition hover:text-gray-900"
              // className="flex gap-8 text-sm font-semibold text-gray-700 capitalize"
            >
              {item?.title}
            </Link>
          ))}
        </div>
        <div className="item-center flex justify-center gap-5 text-gray-700 transition hover:text-gray-900">
          <div className="mr-8 flex items-center justify-center gap-5">
            {' '}
            <Search className="h-5 w-5 cursor-pointer font-semibold" />
            <ShoppingCart className="h-5 w-5 cursor-pointer" />
          </div>
          {/* <User2Icon /> */}
          {loggedIn ? (
            <LogoutButton />
          ) : (
            <Button variant={'default'} className="cursor-pointer">
              Login
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}
