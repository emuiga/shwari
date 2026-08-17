'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ImageIcon,
  MicrophoneIcon,
  MoreIcon,
  PaperPlaneIcon,
  PhoneIcon,
} from '@/components/icons';
import type { Conversation } from '@/features/client/messages/presentation/lib/messages';

interface ChatThreadPanelProps {
  conversation: Conversation | null;
  onSendMessage: (conversationId: string, text: string) => void;
  onMarkCompleted: (conversationId: string) => void;
  onBack?: () => void;
  className?: string;
}

export default function ChatThreadPanel({
  conversation,
  onSendMessage,
  onMarkCompleted,
  onBack,
  className = 'flex',
}: ChatThreadPanelProps) {
  const [draft, setDraft] = useState('');

  if (!conversation) {
    return (
      <div className={`${className} flex-1 items-start justify-center pt-24`}>
        <p className="rounded-control bg-surface-muted px-4 py-3 text-sm text-subtle">
          Select a message to get started with chatting to service providers
        </p>
      </div>
    );
  }

  function handleSend() {
    if (!conversation || !draft.trim()) {
      return;
    }
    onSendMessage(conversation.id, draft);
    setDraft('');
  }

  return (
    <div className={`${className} flex-1 flex-col`}>
      <div className="flex items-center justify-between border-b border-border-soft px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Back to messages"
            onClick={onBack}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-subtle hover:bg-surface-muted lg:hidden"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
            <Image
              src={conversation.providerAvatar}
              alt={conversation.providerName}
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <p className="truncate text-sm font-semibold text-ink">{conversation.providerName}</p>
        </div>
        <button
          type="button"
          aria-label="More options"
          className="flex h-8 w-8 items-center justify-center rounded-full text-faint hover:bg-surface-muted"
        >
          <MoreIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-muted px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2 text-sm text-body">
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-control">
            <Image
              src={conversation.serviceImage}
              alt=""
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <span className="truncate">{conversation.serviceTitle}</span>
        </div>

        {conversation.completed ? (
          <span className="flex items-center gap-1.5 rounded-full bg-primary-subtle px-3 py-1.5 text-xs font-semibold text-primary-strong">
            <CheckCircleIcon className="h-4 w-4" />
            Completed
          </span>
        ) : conversation.canMarkCompleted ? (
          <button
            type="button"
            onClick={() => onMarkCompleted(conversation.id)}
            className="rounded-control bg-primary px-4 py-1.5 text-xs font-semibold text-white hover:bg-primary-strong"
          >
            Mark as Completed
          </button>
        ) : (
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-control border border-primary px-4 py-1.5 text-xs font-semibold text-primary-strong hover:bg-primary-subtle"
          >
            <PhoneIcon className="h-3.5 w-3.5" />
            Call Provider
          </button>
        )}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-6 sm:px-6">
        {conversation.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-card px-4 py-3 text-sm whitespace-pre-line ${
                message.sender === 'user'
                  ? 'rounded-br-sm bg-primary-subtle text-ink'
                  : 'rounded-bl-sm bg-surface-muted text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-border-soft px-4 py-3">
        <button
          type="button"
          aria-label="Attach image"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-faint hover:bg-surface-muted"
        >
          <ImageIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Record voice note"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-faint hover:bg-surface-muted"
        >
          <MicrophoneIcon className="h-5 w-5" />
        </button>
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSend();
            }
          }}
          placeholder="Type a message"
          className="flex-1 rounded-control border-0 bg-transparent py-2 text-sm text-body placeholder:text-faint"
        />
        <button
          type="button"
          aria-label="Send message"
          disabled={!draft.trim()}
          onClick={handleSend}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
            draft.trim() ? 'bg-primary text-white hover:bg-primary-strong' : 'bg-surface-muted text-faint'
          }`}
        >
          <PaperPlaneIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
