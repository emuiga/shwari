'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SearchIcon } from '@/components/icons';
import type { Conversation } from '@/features/provider/messages/presentation/lib/mockMessages';

type Filter = 'all' | 'unread';

interface ConversationListProps {
  conversations: Conversation[];
  hasAnyConversations: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  query: string;
  onQueryChange: (query: string) => void;
  className?: string;
}

export default function ConversationList({
  conversations,
  hasAnyConversations,
  selectedId,
  onSelect,
  filter,
  onFilterChange,
  query,
  onQueryChange,
  className = '',
}: ConversationListProps) {
  return (
    <div className={`w-full shrink-0 flex-col border-gray-100 bg-white md:w-80 md:border-r ${className}`}>
      <div className="border-b border-gray-100 p-4">
        <h1 className="text-lg font-bold text-gray-900">My Messages</h1>
        <div className="relative mt-3">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search"
            className="w-full rounded-md border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
        </div>
        <div className="mt-3 flex gap-4 text-sm font-semibold">
          <button
            type="button"
            onClick={() => onFilterChange('all')}
            className={filter === 'all' ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('unread')}
            className={filter === 'unread' ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}
          >
            Unread
          </button>
        </div>
      </div>

      {!hasAnyConversations ? (
        <div className="flex flex-col items-center gap-3 px-4 py-10 text-center">
          <p className="text-sm text-gray-600">Your messages will appear here. Start a conversation now.</p>
          <Link
            href="/provider/leads"
            className="rounded-md border border-green-500 px-4 py-2 text-sm font-semibold text-green-600 hover:bg-green-50"
          >
            View my leads
          </Link>
        </div>
      ) : conversations.length === 0 ? (
        <p className="px-4 py-10 text-center text-sm text-gray-400">No conversations match your search.</p>
      ) : (
        <ul className="divide-y divide-gray-50 overflow-y-auto">
          {conversations.map((conversation) => (
            <li key={conversation.id}>
              <button
                type="button"
                onClick={() => onSelect(conversation.id)}
                className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${
                  selectedId === conversation.id ? 'bg-green-50' : conversation.unread ? 'bg-green-50/40 hover:bg-green-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                  <Image src={conversation.avatarSrc} alt="" fill sizes="40px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-gray-900">{conversation.customerName}</p>
                    <span className="shrink-0 text-[11px] text-gray-400">{conversation.lastMessageAt}</span>
                  </div>
                  <p className="truncate text-xs font-medium text-gray-600">{conversation.service}</p>
                  <p className="truncate text-xs text-gray-400">{conversation.lastMessagePreview}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
