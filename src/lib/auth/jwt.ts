interface DecodedAccessToken {
  role: string | null;
  memberships: string[];
}

function decodeClaims(accessToken: string): Record<string, unknown> | null {
  const payload = accessToken.split('.')[1];
  if (!payload) return null;

  try {
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = Buffer.from(normalized, 'base64').toString('utf-8');
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function decodeRole(accessToken: string): string | null {
  const claims = decodeClaims(accessToken);
  if (!claims) return null;
  return (claims.activeRole ?? claims.primaryRole ?? claims.role ?? null) as string | null;
}

export function decodeAccessToken(accessToken: string): DecodedAccessToken {
  const claims = decodeClaims(accessToken);
  return {
    role: (claims?.activeRole ?? claims?.primaryRole ?? claims?.role ?? null) as string | null,
    memberships: Array.isArray(claims?.memberships) ? (claims.memberships as string[]) : [],
  };
}
