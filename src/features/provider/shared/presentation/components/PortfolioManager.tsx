'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ImageIcon } from '@/components/icons';
import { ApiError } from '@/features/auth/data/authApi';
import EmptyState from '@/features/provider/shared/presentation/components/EmptyState';
import PortfolioItemModal from '@/features/provider/shared/presentation/components/PortfolioItemModal';
import { deletePortfolioItem } from '@/features/provider/shared/data/portfolioApi';
import type { PortfolioItem } from '@/features/provider/shared/data/types';

interface PortfolioManagerProps {
  initialItems: PortfolioItem[];
}

export default function PortfolioManager({ initialItems }: PortfolioManagerProps) {
  const [items, setItems] = useState(initialItems);
  const [modalTarget, setModalTarget] = useState<PortfolioItem | 'new' | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    setError(null);
    try {
      await deletePortfolioItem(id);
      setItems((current) => current.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-xs text-danger">{error}</p>}

      {items.length === 0 ? (
        <EmptyState
          title="No portfolio items yet"
          description="Showcase your past work by adding photos and details of jobs you've completed."
          actionLabel="Add portfolio item"
          onAction={() => setModalTarget('new')}
        />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {items.map((item) => (
              <div key={item.id} className="rounded-control border border-border-soft p-2">
                <div className="relative flex h-32 w-full items-center justify-center overflow-hidden rounded-control bg-surface-muted">
                  {item.imageUrl ? (
                    <Image src={item.imageUrl} alt="" fill sizes="200px" className="object-cover" />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-faint" />
                  )}
                </div>
                <p className="mt-2 truncate text-sm font-semibold text-ink">{item.title}</p>
                {item.description && <p className="truncate text-xs text-subtle">{item.description}</p>}
                <div className="mt-1.5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setModalTarget(item)}
                    className="rounded-control border border-primary px-2.5 py-1 text-xs font-semibold text-primary-strong hover:bg-primary-subtle"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="rounded-control border border-danger px-2.5 py-1 text-xs font-semibold text-danger hover:bg-danger-soft disabled:opacity-50"
                  >
                    {deletingId === item.id ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setModalTarget('new')}
            className="rounded-control border border-primary px-3 py-1.5 text-xs font-semibold text-primary-strong hover:bg-primary-subtle"
          >
            + Add portfolio item
          </button>
        </>
      )}

      {modalTarget && (
        <PortfolioItemModal
          item={modalTarget === 'new' ? null : modalTarget}
          sortOrder={modalTarget === 'new' ? items.length + 1 : items.findIndex((item) => item.id === modalTarget.id) + 1}
          onClose={() => setModalTarget(null)}
          onSaved={(saved, isNew) => {
            setItems((current) => (isNew ? [...current, saved] : current.map((item) => (item.id === saved.id ? saved : item))));
            setModalTarget(null);
          }}
        />
      )}
    </div>
  );
}
