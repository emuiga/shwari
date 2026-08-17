interface TableSkeletonProps {
  rows: number;
  columns: number;
}

export default function TableSkeleton({ rows, columns }: TableSkeletonProps) {
  return (
    <div className="divide-y divide-gray-100">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex items-center gap-4 px-4 py-3">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="h-4 flex-1 animate-pulse rounded bg-surface-muted" />
          ))}
        </div>
      ))}
    </div>
  );
}
