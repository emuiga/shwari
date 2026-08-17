import { cookies } from 'next/headers';

const ROLE_COOKIE = 'sm_role_ui';

export interface ActiveRoleData {
  role: string;
  memberships: string[];
}

export async function setActiveRoleCookie(data: ActiveRoleData) {
  const store = await cookies();
  store.set(ROLE_COOKIE, JSON.stringify(data), {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export async function clearActiveRoleCookie() {
  const store = await cookies();
  store.delete(ROLE_COOKIE);
}

export async function getActiveRoleCookie(): Promise<ActiveRoleData | null> {
  const store = await cookies();
  const raw = store.get(ROLE_COOKIE)?.value;
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
