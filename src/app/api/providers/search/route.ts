import { NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/auth/backendClient';

export async function GET(request: Request) {
  const { search } = new URL(request.url);
  const result = await fetchBackend(`/providers/search${search}`, { method: 'GET' });
  return NextResponse.json(result, { status: result.status });
}
