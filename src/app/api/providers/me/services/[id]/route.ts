import { NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/auth/backendClient';
import { getAccessToken } from '@/lib/auth/session';

async function requireAccessToken() {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return null;
  }
  return accessToken;
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const accessToken = await requireAccessToken();
  if (!accessToken) {
    return NextResponse.json(
      { success: false, code: 'E00401', description: 'Not authenticated', data: null },
      { status: 401 },
    );
  }

  const { id } = await params;
  const body = await request.json();
  const result = await fetchBackend(`/providers/me/services/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(body),
  });

  return NextResponse.json(result, { status: result.status });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const accessToken = await requireAccessToken();
  if (!accessToken) {
    return NextResponse.json(
      { success: false, code: 'E00401', description: 'Not authenticated', data: null },
      { status: 401 },
    );
  }

  const { id } = await params;
  const result = await fetchBackend(`/providers/me/services/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return NextResponse.json(result, { status: result.status });
}
