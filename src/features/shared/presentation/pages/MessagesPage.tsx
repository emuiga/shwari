'use client';

import ClientMessagesPage from '@/features/client/messages/presentation/pages/MessagesPage';
import ProviderMessagesPage from '@/features/provider/messages/presentation/pages/ProviderMessagesPage';
import { useActiveRole } from '@/features/auth/presentation/context/ActiveRoleContext';

export default function MessagesPage() {
  const { role } = useActiveRole();
  return role === 'SERVICE_PROVIDER' ? <ProviderMessagesPage /> : <ClientMessagesPage />;
}
