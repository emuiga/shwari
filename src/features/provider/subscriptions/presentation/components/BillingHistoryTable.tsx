'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from '@/components/icons';
import { EyeIcon } from '@/features/provider/shared/presentation/components/icons';
import DataTable, { type DataTableColumn } from '@/components/ui/DataTable';
import { formatKes } from '@/lib/formatKes';
import type { BillingRecord } from '@/features/provider/subscriptions/presentation/lib/mockSubscriptions';

interface BillingHistoryTableProps {
  records: BillingRecord[];
  hidePlanColumn?: boolean;
}

const STATUS_STYLES: Record<BillingRecord['paymentStatus'], string> = {
  Paid: 'bg-primary-subtle text-primary-strong',
  Overdue: 'bg-danger-soft text-danger',
};

function buildColumns(hidePlanColumn: boolean): DataTableColumn<BillingRecord>[] {
  const columns: DataTableColumn<BillingRecord>[] = [
    { key: 'receiptNumber', header: 'Receipt number', render: (record) => <span className="font-medium text-ink">{record.receiptNumber}</span> },
    { key: 'amount', header: 'Amount', render: (record) => <span className="text-body">{formatKes(record.amount)}</span> },
  ];
  if (!hidePlanColumn) {
    columns.push({ key: 'subscriptionPlan', header: 'Subscription plan', render: (record) => <span className="text-body">{record.subscriptionPlan}</span> });
  }
  columns.push(
    {
      key: 'paymentStatus',
      header: 'Payment Status',
      render: (record) => (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[record.paymentStatus]}`}>
          {record.paymentStatus}
        </span>
      ),
    },
    { key: 'billingDate', header: 'Billing date', render: (record) => <span className="text-body">{record.billingDate}</span> },
  );
  return columns;
}

export default function BillingHistoryTable({ records, hidePlanColumn = false }: BillingHistoryTableProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns = useMemo(() => buildColumns(hidePlanColumn), [hidePlanColumn]);

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return records;
    return records.filter((record) => record.receiptNumber.toLowerCase().includes(trimmed));
  }, [records, query]);

  return (
    <div>
      <div className="relative mb-3 max-w-xs">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
        <input
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
          placeholder="Search by receipt number"
          className="w-full rounded-control border border-border bg-surface-muted py-2 pl-9 pr-3 text-sm text-ink placeholder:text-faint"
        />
      </div>

      <DataTable<BillingRecord>
        columns={columns}
        data={filtered}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        emptyMessage="No billing records found."
        getItemId={(record) => record.id}
        renderActions={(record) => (
          <button
            type="button"
            aria-label="View receipt"
            onClick={() => router.push(`/subscriptions/${record.id}`)}
            className="rounded-control p-1.5 text-subtle hover:bg-primary-subtle hover:text-primary-strong"
          >
            <EyeIcon className="h-4 w-4" />
          </button>
        )}
      />
    </div>
  );
}
