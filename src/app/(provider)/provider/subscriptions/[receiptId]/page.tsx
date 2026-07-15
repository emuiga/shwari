import BillingReceiptDetailPage from '@/features/provider/subscriptions/presentation/pages/BillingReceiptDetailPage';

export default async function Page({ params }: { params: Promise<{ receiptId: string }> }) {
  const { receiptId } = await params;
  return <BillingReceiptDetailPage receiptId={receiptId} />;
}
