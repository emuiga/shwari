interface StatCardProps {
  label: string;
  value: string | number;
  trend?: { value: number; isPositive: boolean };
}

export default function StatCard({ label, value, trend }: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>

      <p className="mt-3 text-2xl font-bold tabular-nums text-gray-900">{value}</p>

      {trend ? (
        <p className={`mt-1 text-xs font-medium ${trend.isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
          {trend.isPositive ? '▲' : '▼'} {trend.value}% <span className="text-gray-400">vs last month</span>
        </p>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-green-300 to-green-500" />
    </div>
  );
}
