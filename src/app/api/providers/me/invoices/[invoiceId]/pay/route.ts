import { NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/auth/backendClient';
import { getAccessToken } from '@/lib/auth/session';

export async function POST(request: Request, { params }: { params: Promise<{ invoiceId: string }> }) {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return NextResponse.json(
      { success: false, code: 'E00401', description: 'Not authenticated', data: null },
      { status: 401 },
    );
  }

  const { invoiceId } = await params;
  const body = await request.json();
  const result = await fetchBackend(`/providers/me/invoices/${invoiceId}/pay`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(body),
  });

  return NextResponse.json(result, { status: result.status });
}
