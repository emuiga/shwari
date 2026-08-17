'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from '@/components/icons';
import { EyeIcon } from '@/features/provider/shared/presentation/components/icons';
import DataTable, { type DataTableColumn } from '@/components/ui/DataTable';
import { formatDate } from '@/features/provider/subscriptions/presentation/lib/planDisplay';
import { formatKes } from '@/lib/formatKes';
import type { Invoice } from '@/features/provider/subscriptions/data/types';

interface BillingHistoryTableProps {
  records: Invoice[];
  hidePlanColumn?: boolean;
}

const STATUS_STYLES: Record<string, string> = {
  PAID: 'bg-primary-subtle text-primary-strong',
  PENDING: 'bg-warning-soft text-warning',
  OVERDUE: 'bg-danger-soft text-danger',
  FAILED: 'bg-danger-soft text-danger',
};

function buildColumns(hidePlanColumn: boolean): DataTableColumn<Invoice>[] {
  const columns: DataTableColumn<Invoice>[] = [
    { key: 'invoiceNumber', header: 'Invoice number', render: (record) => <span className="font-medium text-ink">{record.invoiceNumber ?? record.id}</span> },
    { key: 'amount', header: 'Amount', render: (record) => <span className="text-body">{record.amount != null ? formatKes(record.amount) : '—'}</span> },
  ];
  if (!hidePlanColumn) {
    columns.push({ key: 'planName', header: 'Subscription plan', render: (record) => <span className="text-body">{record.planName ?? '—'}</span> });
  }
  columns.push(
    {
      key: 'status',
      header: 'Payment Status',
      render: (record) => (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[record.status ?? ''] ?? 'bg-surface-muted text-body'}`}>
          {record.status ?? 'Unknown'}
        </span>
      ),
    },
    { key: 'createdAt', header: 'Billing date', render: (record) => <span className="text-body">{formatDate(record.createdAt ?? record.dueDate)}</span> },
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
    return records.filter((record) => (record.invoiceNumber ?? record.id).toLowerCase().includes(trimmed));
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
          placeholder="Search by invoice number"
          className="w-full rounded-control border border-border bg-surface-muted py-2 pl-9 pr-3 text-sm text-ink placeholder:text-faint"
        />
      </div>

      <DataTable<Invoice>
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
            aria-label="View invoice"
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
