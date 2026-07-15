'use client';

import { useMemo, useState } from 'react';
import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import ConversationList from '@/features/provider/messages/presentation/components/ConversationList';
import ConversationThread from '@/features/provider/messages/presentation/components/ConversationThread';
import { ChatIcon } from '@/components/icons';
import { mockConversations } from '@/features/provider/messages/presentation/lib/mockMessages';

type Filter = 'all' | 'unread';

export default function ProviderMessagesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const filteredConversations = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    return mockConversations.filter((conversation) => {
      if (filter === 'unread' && !conversation.unread) return false;
      if (!trimmed) return true;
      return conversation.customerName.toLowerCase().includes(trimmed) || conversation.service.toLowerCase().includes(trimmed);
    });
  }, [filter, query]);

  const selectedConversation = mockConversations.find((conversation) => conversation.id === selectedId) ?? null;

  return (
    <div className="min-h-screen w-full bg-white lg:bg-transparent">
      <ProviderHeader />
      <div className="flex h-[calc(100vh-73px)] flex-col overflow-hidden border-t border-gray-100 md:flex-row">
        <ConversationList
          conversations={filteredConversations}
          hasAnyConversations={mockConversations.length > 0}
          selectedId={selectedId}
          onSelect={setSelectedId}
          filter={filter}
          onFilterChange={setFilter}
          query={query}
          onQueryChange={setQuery}
          className={selectedId ? 'hidden md:flex' : 'flex'}
        />

        {selectedConversation ? (
          <ConversationThread
            key={selectedConversation.id}
            conversation={selectedConversation}
            onBack={() => setSelectedId(null)}
            className={selectedId ? 'flex' : 'hidden md:flex'}
          />
        ) : (
          <div className={`min-h-0 flex-1 flex-col items-center justify-center gap-2 bg-gray-50 px-4 text-center ${selectedId ? 'flex' : 'hidden md:flex'}`}>
            <ChatIcon className="h-8 w-8 text-gray-300" />
            <p className="text-sm text-gray-500">Select a message to get started with chatting to service providers</p>
          </div>
        )}
      </div>
    </div>
  );
}
