'use client';
import { logout } from '@/lib/session';
import { Button } from '@/components/ui/button';

export default function LogoutButton() {
  return (
    <Button onClick={logout} className="cursor-pointer" variant={'outline'}>
      Logout
    </Button>
  );
}
