'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  CheckCircleIcon,
  ImageIcon,
  MicrophoneIcon,
  MoreIcon,
  PaperPlaneIcon,
  PhoneIcon,
} from '@/features/dashboard/presentation/components/icons';
import type { Conversation } from '@/features/dashboard/presentation/lib/messages';

interface ChatThreadPanelProps {
  conversation: Conversation | null;
  onSendMessage: (conversationId: string, text: string) => void;
  onMarkCompleted: (conversationId: string) => void;
}

export default function ChatThreadPanel({
  conversation,
  onSendMessage,
  onMarkCompleted,
}: ChatThreadPanelProps) {
  const [draft, setDraft] = useState('');

  if (!conversation) {
    return (
      <div className="flex flex-1 items-start justify-center pt-24">
        <p className="rounded-md bg-gray-50 px-4 py-3 text-sm text-gray-500">
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
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-full">
            <Image
              src={conversation.providerAvatar}
              alt={conversation.providerName}
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <p className="text-sm font-semibold text-gray-900">{conversation.providerName}</p>
        </div>
        <button
          type="button"
          aria-label="More options"
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-50"
        >
          <MoreIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 bg-gray-50 px-6 py-3">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md">
            <Image
              src={conversation.serviceImage}
              alt=""
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <span>{conversation.serviceTitle}</span>
        </div>

        {conversation.completed ? (
          <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
            <CheckCircleIcon className="h-4 w-4" />
            Completed
          </span>
        ) : conversation.canMarkCompleted ? (
          <button
            type="button"
            onClick={() => onMarkCompleted(conversation.id)}
            className="rounded-md bg-green-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-green-600"
          >
            Mark as Completed
          </button>
        ) : (
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-md border border-green-500 px-4 py-1.5 text-xs font-semibold text-green-600 hover:bg-green-50"
          >
            <PhoneIcon className="h-3.5 w-3.5" />
            Call Provider
          </button>
        )}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-6 py-6">
        {conversation.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm whitespace-pre-line ${
                message.sender === 'user'
                  ? 'rounded-br-sm bg-green-100 text-gray-900'
                  : 'rounded-bl-sm bg-gray-100 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-gray-100 px-4 py-3">
        <button
          type="button"
          aria-label="Attach image"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-50"
        >
          <ImageIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Record voice note"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-50"
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
          className="flex-1 rounded-md border-0 bg-transparent py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
        />
        <button
          type="button"
          aria-label="Send message"
          disabled={!draft.trim()}
          onClick={handleSend}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
            draft.trim() ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-100 text-gray-400'
          }`}
        >
          <PaperPlaneIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
