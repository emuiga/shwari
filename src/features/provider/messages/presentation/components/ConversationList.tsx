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
    <div className={`w-full shrink-0 flex-col border-border-soft bg-white md:w-80 md:border-r ${className}`}>
      <div className="border-b border-border-soft p-4">
        <h1 className="text-lg font-bold text-ink">My Messages</h1>
        <div className="relative mt-3">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          <input
            type="text"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search"
            className="w-full rounded-control border border-border bg-surface-muted py-2 pl-9 pr-3 text-sm text-ink placeholder:text-faint"
          />
        </div>
        <div className="mt-3 flex gap-4 text-sm font-semibold">
          <button
            type="button"
            onClick={() => onFilterChange('all')}
            className={filter === 'all' ? 'text-primary-strong' : 'text-faint hover:text-body'}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('unread')}
            className={filter === 'unread' ? 'text-primary-strong' : 'text-faint hover:text-body'}
          >
            Unread
          </button>
        </div>
      </div>

      {!hasAnyConversations ? (
        <div className="flex flex-col items-center gap-3 px-4 py-10 text-center">
          <p className="text-sm text-body">Your messages will appear here. Start a conversation now.</p>
          <Link
            href="/leads"
            className="rounded-control border border-primary px-4 py-2 text-sm font-semibold text-primary-strong hover:bg-primary-subtle"
          >
            View my leads
          </Link>
        </div>
      ) : conversations.length === 0 ? (
        <p className="px-4 py-10 text-center text-sm text-faint">No conversations match your search.</p>
      ) : (
        <ul className="divide-y divide-gray-50 overflow-y-auto">
          {conversations.map((conversation) => (
            <li key={conversation.id}>
              <button
                type="button"
                onClick={() => onSelect(conversation.id)}
                className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${
                  selectedId === conversation.id ? 'bg-primary-subtle' : conversation.unread ? 'bg-primary-subtle/40 hover:bg-primary-subtle' : 'hover:bg-surface-muted'
                }`}
              >
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-surface-muted">
                  <Image src={conversation.avatarSrc} alt="" fill sizes="40px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-ink">{conversation.customerName}</p>
                    <span className="shrink-0 text-[11px] text-faint">{conversation.lastMessageAt}</span>
                  </div>
                  <p className="truncate text-xs font-medium text-body">{conversation.service}</p>
                  <p className="truncate text-xs text-faint">{conversation.lastMessagePreview}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
