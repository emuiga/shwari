import { NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/auth/backendClient';
import { clearSessionCookies, getRefreshToken } from '@/lib/auth/session';
import { clearActiveRoleCookie } from '@/lib/auth/activeRoleCookie';

export async function POST() {
  const refreshToken = await getRefreshToken();

  if (refreshToken) {
    await fetchBackend('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    }).catch(() => null);
  }

  await clearSessionCookies();
  await clearActiveRoleCookie();
  return NextResponse.json({ success: true });
}
