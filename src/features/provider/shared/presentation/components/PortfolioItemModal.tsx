'use client';

import Image from 'next/image';
import { useState } from 'react';
import { XIcon } from '@/components/icons';
import { ApiError } from '@/features/auth/data/authApi';
import ImageUploader from '@/features/provider/shared/presentation/components/ImageUploader';
import {
  createPortfolioItem,
  updatePortfolioItem,
} from '@/features/provider/shared/data/portfolioApi';
import type { PortfolioItem } from '@/features/provider/shared/data/types';

interface PortfolioItemModalProps {
  item: PortfolioItem | null;
  sortOrder: number;
  onClose: () => void;
  onSaved: (item: PortfolioItem, isNew: boolean) => void;
}

export default function PortfolioItemModal({ item, sortOrder, onClose, onSaved }: PortfolioItemModalProps) {
  const [title, setTitle] = useState(item?.title ?? '');
  const [description, setDescription] = useState(item?.description ?? '');
  const [mediaId, setMediaId] = useState<string | null>(item?.mediaId ?? null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      if (item) {
        const updated = await updatePortfolioItem(item.id, {
          title: title.trim(),
          description: description.trim(),
          sortOrder,
        });
        onSaved(updated, false);
      } else {
        const created = await createPortfolioItem({
          title: title.trim(),
          description: description.trim(),
          mediaId,
          sortOrder,
        });
        onSaved(created, true);
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-8">
      <div className="relative w-full max-w-xl rounded-card bg-white p-6 shadow-xl">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 text-faint hover:text-body"
        >
          <XIcon className="h-4 w-4" />
        </button>

        <h2 className="text-lg font-bold text-ink">{item ? 'Edit portfolio item' : 'Add a portfolio item'}</h2>

        <div className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-body">Title</label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-control border border-border-strong px-3 py-2 text-sm text-ink focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-body">Description</label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              className="w-full rounded-control border border-border-strong px-3 py-2 text-sm text-ink focus:border-primary"
            />
          </div>

          {item ? (
            item.imageUrl && (
              <div>
                <p className="mb-1 text-xs font-medium text-body">Image</p>
                <div className="relative h-20 w-20 overflow-hidden rounded-control border border-border-soft">
                  <Image src={item.imageUrl} alt="" fill sizes="80px" className="object-cover" />
                </div>
              </div>
            )
          ) : (
            <ImageUploader label="Image" purpose="PORTFOLIO" maxImages={1} onChange={(mediaIds) => setMediaId(mediaIds[0] ?? null)} />
          )}
        </div>

        {error && <p className="mt-3 text-sm text-danger">{error}</p>}

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="flex-1 rounded-control border border-border-strong py-2 text-sm font-semibold text-body hover:border-danger hover:bg-danger-soft hover:text-danger disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex-1 rounded-control bg-primary py-2 text-sm font-semibold text-white hover:bg-primary-strong disabled:opacity-50"
          >
            {saving ? 'Saving…' : item ? 'Save changes' : 'Add item'}
          </button>
        </div>
      </div>
    </div>
  );
}
