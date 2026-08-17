import { NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/auth/backendClient';
import { getAccessToken, setSessionCookies } from '@/lib/auth/session';
import { decodeAccessToken } from '@/lib/auth/jwt';
import { setActiveRoleCookie } from '@/lib/auth/activeRoleCookie';

interface TokenData {
  accessToken: string;
  refreshToken: string;
}

export async function POST(request: Request) {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return NextResponse.json(
      { success: false, code: 'E00401', description: 'Not authenticated', data: null },
      { status: 401 },
    );
  }

  const body = await request.json();
  const result = await fetchBackend<TokenData>('/auth/switch-profile', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(body),
  });

  if (!result.success || !result.data) {
    return NextResponse.json(result, { status: result.status });
  }

  const { accessToken: newAccessToken, refreshToken } = result.data;
  await setSessionCookies({ accessToken: newAccessToken, refreshToken });
  const { role, memberships } = decodeAccessToken(newAccessToken);
  if (role) {
    await setActiveRoleCookie({ role, memberships });
  }

  return NextResponse.json(
    { ...result, data: { role } },
    { status: result.status },
  );
}
