import { NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/auth/backendClient';

export async function GET() {
  const result = await fetchBackend('/service-categories');
  return NextResponse.json(result, { status: result.status });
}
