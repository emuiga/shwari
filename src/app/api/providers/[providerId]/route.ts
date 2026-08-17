import { NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/auth/backendClient';

export async function GET(_request: Request, { params }: { params: Promise<{ providerId: string }> }) {
  const { providerId } = await params;
  const result = await fetchBackend(`/providers/${providerId}`, { method: 'GET' });
  return NextResponse.json(result, { status: result.status });
}
