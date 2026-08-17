import BillingReceiptDetailPage from '@/features/provider/subscriptions/presentation/pages/BillingReceiptDetailPage';
import RequireRole from '@/features/auth/presentation/components/RequireRole';

export default async function Page({ params }: { params: Promise<{ receiptId: string }> }) {
  const { receiptId } = await params;
  return (
    <RequireRole role="SERVICE_PROVIDER">
      <BillingReceiptDetailPage receiptId={receiptId} />
    </RequireRole>
  );
}
