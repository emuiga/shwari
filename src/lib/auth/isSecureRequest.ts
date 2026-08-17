import { headers } from 'next/headers';

/**
 * Marking cookies `Secure` when the connection isn't actually HTTPS makes browsers
 * silently drop them (no cookie is ever stored), so this checks the real inbound
 * protocol via the reverse-proxy header instead of trusting NODE_ENV alone.
 */
export async function isSecureRequest(): Promise<boolean> {
  const headerStore = await headers();
  const forwardedProto = headerStore.get('x-forwarded-proto');
  if (forwardedProto) return forwardedProto.split(',')[0].trim() === 'https';
  return process.env.NODE_ENV === 'production';
}
