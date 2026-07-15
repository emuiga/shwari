'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '@/components/icons';
import { DownloadIcon, MaximizeIcon, MinimizeIcon } from '@/features/provider/shared/presentation/components/icons';
import EmptyState from '@/features/provider/shared/presentation/components/EmptyState';
import TableSkeleton from '@/components/ui/TableSkeleton';

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render?: (item: T, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  loading?: boolean;
  total?: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
  emptyMessage?: string;
  className?: string;
  getItemId?: (item: T) => string | number;
  onRowClick?: (item: T) => void;
  renderActions?: (item: T) => React.ReactNode;
}

export default function DataTable<T extends object>({
  columns,
  data,
  loading = false,
  total,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  emptyMessage = 'No data found',
  className = '',
  getItemId = (item) => String((item as Record<string, unknown>).id),
  onRowClick,
  renderActions,
}: DataTableProps<T>) {
  const [fullScreen, setFullScreen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
        setActionsOpen(false);
      }
    }
    if (actionsOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [actionsOpen]);

  useEffect(() => {
    document.body.style.overflow = fullScreen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [fullScreen]);

  const isServerSide = total !== undefined && total !== data.length;
  const displayTotal = total !== undefined ? total : data.length;
  const totalPages = Math.max(1, Math.ceil(displayTotal / pageSize));
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, displayTotal);
  const displayData = isServerSide ? data : data.slice(startIndex, endIndex);

  function exportCSV() {
    const headers = columns.map((column) => column.header).join(',');
    const rows = data.map((row) =>
      columns
        .map((column) => {
          const value = (row as Record<string, unknown>)[column.key];
          return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : (value ?? '');
        })
        .join(','),
    );
    const blob = new Blob([[headers, ...rows].join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'export.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setActionsOpen(false);
  }

  function getPaginationPages(): Array<number | '...'> {
    const pages: Array<number | '...'> = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
      if (page < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm ${className} ${
        fullScreen ? 'fixed inset-0 z-50 rounded-none' : ''
      }`}
    >
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Show:</span>
          <div className="relative">
            <select
              value={pageSize}
              disabled={loading}
              onChange={(event) => {
                onPageSizeChange(Number(event.target.value));
                onPageChange(1);
              }}
              className="cursor-pointer appearance-none rounded-full border border-gray-200 bg-white py-1 pl-3 pr-7 text-xs font-medium text-gray-600 focus:outline-none"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-500" />
          </div>
          <span className="text-xs text-gray-500">entries</span>
        </div>

        <div className="relative" ref={actionsRef}>
          <button
            type="button"
            onClick={() => setActionsOpen((current) => !current)}
            className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            Actions
            <ChevronDownIcon className="h-3 w-3" />
          </button>
          {actionsOpen && (
            <div className="absolute right-0 top-full z-50 mt-1 w-44 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
              <button
                type="button"
                onClick={exportCSV}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-gray-700 hover:bg-green-50 hover:text-green-600"
              >
                <DownloadIcon className="h-3.5 w-3.5" />
                Export CSV
              </button>
              <div className="mx-2 my-1 h-px bg-gray-100" />
              <button
                type="button"
                onClick={() => {
                  setFullScreen((current) => !current);
                  setActionsOpen(false);
                }}
                className="flex w-full items-center gap-2 whitespace-nowrap px-3 py-2 text-left text-xs text-gray-700 hover:bg-green-50 hover:text-green-600"
              >
                {fullScreen ? <MinimizeIcon className="h-3.5 w-3.5" /> : <MaximizeIcon className="h-3.5 w-3.5" />}
                {fullScreen ? 'Exit Full Screen' : 'Full Screen'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto" style={{ maxHeight: fullScreen ? 'calc(100vh - 120px)' : undefined }}>
        {loading ? (
          <TableSkeleton rows={pageSize > 10 ? 10 : pageSize} columns={columns.length} />
        ) : displayData.length === 0 ? (
          <EmptyState className="border-0 py-10" title={emptyMessage} />
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 ${column.headerClassName ?? ''}`}
                  >
                    {column.header}
                  </th>
                ))}
                {renderActions && <th className="px-4 py-3" />}
              </tr>
            </thead>
            <tbody>
              {displayData.map((item, index) => (
                <tr
                  key={getItemId(item)}
                  onClick={() => onRowClick?.(item)}
                  className={`border-b border-gray-50 last:border-0 transition-colors hover:bg-green-50/60 ${
                    onRowClick ? 'cursor-pointer' : ''
                  } ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}`}
                >
                  {columns.map((column) => (
                    <td key={column.key} className={`px-4 py-3 text-gray-700 ${column.className ?? ''}`}>
                      {column.render ? column.render(item, index) : String((item as Record<string, unknown>)[column.key] ?? '')}
                    </td>
                  ))}
                  {renderActions && (
                    <td className="px-4 py-3" onClick={(event) => event.stopPropagation()}>
                      {renderActions(item)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {!loading && displayData.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-gray-500">
            Showing {startIndex + 1}–{endIndex} of {displayTotal}
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            {getPaginationPages().map((pageNumber, index) =>
              pageNumber === '...' ? (
                <span key={`ellipsis-${index}`} className="px-2 text-xs text-gray-400">
                  …
                </span>
              ) : (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => onPageChange(pageNumber)}
                  className={`h-8 w-8 rounded-lg border text-xs transition-colors ${
                    page === pageNumber ? 'border-green-600 bg-green-600 text-white' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </button>
              ),
            )}
            <button
              type="button"
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
