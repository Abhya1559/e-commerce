import { redirect } from 'next/navigation';

export default async function LogoutPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  await fetch(new URL('/api/auth/logout', baseUrl));
  return redirect('/');
}
