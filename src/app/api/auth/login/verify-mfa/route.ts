import { NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/auth/backendClient';
import { setSessionCookies } from '@/lib/auth/session';
import { decodeAccessToken } from '@/lib/auth/jwt';
import { setActiveRoleCookie } from '@/lib/auth/activeRoleCookie';

interface TokenData {
  accessToken: string;
  refreshToken: string;
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = await fetchBackend<TokenData>('/auth/login/verify-mfa', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (!result.success || !result.data) {
    return NextResponse.json(result, { status: result.status });
  }

  const { accessToken, refreshToken } = result.data;
  await setSessionCookies({ accessToken, refreshToken });
  const { role, memberships } = decodeAccessToken(accessToken);
  if (role) {
    await setActiveRoleCookie({ role, memberships });
  }

  return NextResponse.json(
    { ...result, data: { role } },
    { status: result.status },
  );
}
