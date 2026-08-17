import { NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/auth/backendClient';

export async function GET() {
  const result = await fetchBackend('/health', { method: 'GET' });
  return NextResponse.json(result, { status: result.status });
}
