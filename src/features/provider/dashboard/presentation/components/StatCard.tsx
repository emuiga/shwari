interface StatCardProps {
  label: string;
  value: string | number;
  trend?: { value: number; isPositive: boolean };
}

export default function StatCard({ label, value, trend }: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-card border border-border-soft bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-subtle">{label}</p>

      <p className="mt-3 text-2xl font-bold tabular-nums text-ink">{value}</p>

      {trend ? (
        <p className={`mt-1 text-xs font-medium ${trend.isPositive ? 'text-emerald-600' : 'text-danger'}`}>
          {trend.isPositive ? '▲' : '▼'} {trend.value}% <span className="text-faint">vs last month</span>
        </p>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-green-300 to-green-500" />
    </div>
  );
}
