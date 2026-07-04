import { CompareProvider } from '@/features/dashboard/presentation/context/CompareContext';

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CompareProvider>{children}</CompareProvider>;
}
