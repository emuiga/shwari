'use client';

import Image from 'next/image';
import { useState } from 'react';
import { SearchIcon } from '@/components/icons';
import type { Conversation } from '@/features/client/messages/presentation/lib/messages';

type Filter = 'all' | 'unread';

interface ConversationListPanelProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  className?: string;
}

export default function ConversationListPanel({
  conversations,
  selectedId,
  onSelect,
  className = 'flex',
}: ConversationListPanelProps) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = conversations
    .filter((conversation) => (filter === 'unread' ? conversation.unread : true))
    .filter((conversation) =>
      `${conversation.providerName} ${conversation.serviceTitle}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
    );

  return (
    <aside className={`${className} w-full shrink-0 flex-col border-gray-100 lg:max-w-sm lg:border-r`}>
      <div className="px-4 pt-5 pb-3">
        <h1 className="text-lg font-bold text-gray-900">My Messages</h1>

        <div className="relative mt-4">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            className="w-full rounded-md border border-gray-200 py-2 pr-3 pl-9 text-sm text-gray-700 placeholder:text-gray-400 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div className="mt-4 flex gap-5 border-b border-gray-100 text-sm font-medium">
          {(['all', 'unread'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`-mb-px border-b-2 pb-2 capitalize ${
                filter === tab
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mx-4 mt-6 rounded-2xl border border-gray-200 px-4 py-16 text-center">
          <p className="text-sm text-gray-500">
            Your messages will appear here. Start a conversation now.
          </p>
        </div>
      ) : (
        <ul className="flex-1 overflow-y-auto">
          {filtered.map((conversation) => (
            <li key={conversation.id}>
              <button
                type="button"
                onClick={() => onSelect(conversation.id)}
                className={`flex w-full items-start gap-3 border-l-4 px-4 py-3 text-left transition-colors ${
                  selectedId === conversation.id
                    ? 'border-green-500 bg-green-50'
                    : conversation.unread
                      ? 'border-green-500 hover:bg-gray-50'
                      : 'border-transparent hover:bg-gray-50'
                }`}
              >
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={conversation.providerAvatar}
                    alt={conversation.providerName}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`truncate text-sm ${
                        conversation.unread ? 'font-semibold text-gray-900' : 'font-medium text-gray-800'
                      }`}
                    >
                      {conversation.providerName}
                    </p>
                    <span className="shrink-0 text-xs text-gray-400">{conversation.date}</span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-gray-500">{conversation.serviceTitle}</p>
                  <p className="mt-0.5 truncate text-xs text-gray-400">{conversation.preview}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
