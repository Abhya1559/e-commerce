'use client';

import { logout } from '@/lib/session';
import { Button } from '../ui/button';

export default function LogoutButton() {
  return (
    <Button onClick={logout} variant={'destructive'}>
      Logout
    </Button>
  );
}
