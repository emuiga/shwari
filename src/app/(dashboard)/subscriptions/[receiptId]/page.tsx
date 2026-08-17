import BillingReceiptDetailPage from '@/features/provider/subscriptions/presentation/pages/BillingReceiptDetailPage';
import RequireRole from '@/features/auth/presentation/components/RequireRole';
import { getInvoiceServer } from '@/features/provider/subscriptions/data/subscriptionApi.server';

export default async function Page({ params }: { params: Promise<{ receiptId: string }> }) {
  const { receiptId } = await params;
  const invoice = await getInvoiceServer(receiptId);
  return (
    <RequireRole role="SERVICE_PROVIDER">
      <BillingReceiptDetailPage invoice={invoice} />
    </RequireRole>
  );
}
