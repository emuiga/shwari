import { NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/auth/backendClient';

export async function POST(request: Request) {
  const body = await request.json();
  const result = await fetchBackend('/auth/resend-confirmation', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return NextResponse.json(result, { status: result.status });
}
