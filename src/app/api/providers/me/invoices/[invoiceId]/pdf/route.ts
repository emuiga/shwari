import { NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/auth/backendClient';
import { getAccessToken } from '@/lib/auth/session';

interface InvoicePdfResponse {
  downloadUrl?: string;
}

export async function GET(_request: Request, { params }: { params: Promise<{ invoiceId: string }> }) {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return NextResponse.json(
      { success: false, code: 'E00401', description: 'Not authenticated', data: null },
      { status: 401 },
    );
  }

  const { invoiceId } = await params;
  const result = await fetchBackend<InvoicePdfResponse>(`/providers/me/invoices/${invoiceId}/pdf`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!result.success || !result.data?.downloadUrl) {
    return NextResponse.json(result, { status: result.status });
  }

  return NextResponse.redirect(result.data.downloadUrl);
}
