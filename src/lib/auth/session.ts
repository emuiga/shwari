import { cookies } from 'next/headers';
import { isSecureRequest } from '@/lib/auth/isSecureRequest';

const ACCESS_COOKIE = 'sm_access';
const REFRESH_COOKIE = 'sm_refresh';
const REFRESH_MAX_AGE_SECONDS = 30 * 24 * 60 * 60;

interface SessionTokens {
  accessToken: string;
  refreshToken: string;
}

export async function setSessionCookies({ accessToken, refreshToken }: SessionTokens) {
  const store = await cookies();
  const base = {
    httpOnly: true,
    secure: await isSecureRequest(),
    sameSite: 'lax' as const,
    path: '/',
  };

  store.set(ACCESS_COOKIE, accessToken, base);
  store.set(REFRESH_COOKIE, refreshToken, { ...base, maxAge: REFRESH_MAX_AGE_SECONDS });
}

export async function clearSessionCookies() {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
}

export async function getAccessToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(ACCESS_COOKIE)?.value;
}

export async function getRefreshToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(REFRESH_COOKIE)?.value;
}
