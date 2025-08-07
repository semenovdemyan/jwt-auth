'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export function useAuth() {
  const { data: session, status } = useSession();

  const loginWithCredentials = async (email: string, password: string) => {
    await signIn('credentials', { email, password, redirect: false });
  };

  const loginWithProvider = (provider: 'google' | 'vk' | 'apple') => {
    signIn(provider);
  };

  return {
    session,
    status,
    loginWithCredentials,
    loginWithProvider,
    logout: () => signOut(),
  };
}
