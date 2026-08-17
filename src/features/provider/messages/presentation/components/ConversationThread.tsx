'use client';

import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import {
  ChevronLeftIcon,
  ImageIcon,
  MicrophoneIcon,
  MoreIcon,
  PaperPlaneIcon,
  PhoneIcon,
} from '@/components/icons';
import { CheckIcon } from '@/features/provider/shared/presentation/components/icons';
import type { ChatMessage, Conversation } from '@/features/provider/messages/presentation/lib/mockMessages';

interface ConversationThreadProps {
  conversation: Conversation;
  onBack: () => void;
  className?: string;
}

function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString('en-KE', { hour: 'numeric', minute: '2-digit' });
}

export default function ConversationThread({ conversation, onBack, className = '' }: ConversationThreadProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(conversation.messages);
  const [draft, setDraft] = useState('');

  function handleSend() {
    const text = draft.trim();
    if (!text) return;
    setMessages((current) => [
      ...current,
      {
        id: `${conversation.id}-${current.length + 1}-${Date.now()}`,
        sender: 'provider',
        text,
        timestamp: formatTimestamp(new Date()),
      },
    ]);
    setDraft('');
  }

  return (
    <div className={`flex min-h-0 flex-1 flex-col bg-white ${className}`}>
      <div className="flex items-center justify-between border-b border-border-soft px-4 py-3">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onBack} aria-label="Back to messages" className="text-faint hover:text-body md:hidden">
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-surface-muted">
            <Image src={conversation.avatarSrc} alt="" fill sizes="36px" className="object-cover" />
          </div>
          <p className="text-sm font-semibold text-ink">{conversation.customerName}</p>
        </div>
        <button type="button" aria-label="More options" className="rounded-control p-1 text-faint hover:bg-surface-muted hover:text-body">
          <MoreIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 border-b border-border-soft bg-surface-muted px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <Image src="/images/Logistics-bro.svg" alt="" width={32} height={32} className="h-8 w-8 shrink-0" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">{conversation.service}</p>
            <p className="truncate text-xs text-subtle">
              {conversation.fromLocation} — {conversation.toLocation}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => toast.info(`Calling ${conversation.customerName}…`)}
          className="flex shrink-0 items-center gap-1.5 rounded-control bg-primary px-3 py-2 text-xs font-semibold text-white hover:bg-primary-strong"
        >
          <PhoneIcon className="h-3.5 w-3.5" />
          Call Client
        </button>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'provider' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] whitespace-pre-line rounded-card px-3.5 py-2.5 text-sm ${
                message.sender === 'provider' ? 'bg-primary-subtle text-ink' : 'bg-surface-muted text-body'
              }`}
            >
              {message.text}
              <div
                className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${
                  message.sender === 'provider' ? 'text-faint' : 'text-subtle'
                }`}
              >
                {message.timestamp}
                {message.sender === 'provider' && <CheckIcon className="h-3 w-3" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-border-soft px-4 py-3">
        <button type="button" aria-label="Attach image" className="text-faint hover:text-body">
          <ImageIcon className="h-5 w-5" />
        </button>
        <button type="button" aria-label="Record voice note" className="text-faint hover:text-body">
          <MicrophoneIcon className="h-5 w-5" />
        </button>
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') handleSend();
          }}
          placeholder="Type a message"
          className="min-w-0 flex-1 rounded-control border border-border bg-surface-muted px-3 py-2 text-sm text-ink placeholder:text-faint"
        />
        <button
          type="button"
          onClick={handleSend}
          aria-label="Send message"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white hover:bg-primary-strong"
        >
          <PaperPlaneIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
