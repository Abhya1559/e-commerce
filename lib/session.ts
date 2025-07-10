'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function isLoggedIn() {
  return (await cookies()).has('token');
}

export async function logout() {
  (await cookies()).delete('token');
  redirect('/');
}
