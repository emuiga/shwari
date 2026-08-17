'use client';

import { useRef, useState, type DragEvent } from 'react';
import Image from 'next/image';
import { UploadIcon, XIcon } from '@/components/icons';
import { uploadMedia, type MediaPurpose } from '@/features/provider/shared/data/mediaApi';

interface Attachment {
  mediaId: string;
  previewUrl: string;
  uploading: boolean;
}

export interface ImageUploaderInitialAttachment {
  mediaId: string;
  previewUrl: string;
}

interface ImageUploaderProps {
  label?: string;
  purpose: MediaPurpose;
  onChange: (mediaIds: string[]) => void;
  maxImages?: number;
  initialAttachments?: ImageUploaderInitialAttachment[];
}

export default function ImageUploader({
  label = 'Upload Images',
  purpose,
  onChange,
  maxImages = 6,
  initialAttachments = [],
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [attachments, setAttachments] = useState<Attachment[]>(() =>
    initialAttachments.map((item) => ({ ...item, uploading: false })),
  );
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isSingle = maxImages === 1;
  const atLimit = !isSingle && attachments.length >= maxImages;

  function emitChange(next: Attachment[]) {
    setAttachments(next);
    onChange(next.filter((item) => !item.uploading).map((item) => item.mediaId));
  }

  async function addFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);

    let base = isSingle ? [] : attachments;
    if (isSingle) emitChange(base);

    const remainingSlots = isSingle ? 1 : maxImages - base.length;
    const selected = Array.from(files)
      .filter((file) => file.type.startsWith('image/'))
      .slice(0, remainingSlots);

    for (const file of selected) {
      const previewUrl = URL.createObjectURL(file);
      const placeholderId = `pending-${Date.now()}-${Math.random()}`;
      const withPlaceholder = [...base, { mediaId: placeholderId, previewUrl, uploading: true }];
      base = withPlaceholder;
      emitChange(withPlaceholder);

      try {
        const mediaId = await uploadMedia(file, purpose);
        setAttachments((current) => {
          const next = current.map((item) =>
            item.mediaId === placeholderId ? { mediaId, previewUrl, uploading: false } : item,
          );
          onChange(next.filter((item) => !item.uploading).map((item) => item.mediaId));
          return next;
        });
      } catch {
        setError('One or more images failed to upload. Please try again.');
        setAttachments((current) => {
          const next = current.filter((item) => item.mediaId !== placeholderId);
          onChange(next.filter((item) => !item.uploading).map((item) => item.mediaId));
          return next;
        });
      }
    }
  }

  function removeImage(mediaId: string) {
    emitChange(attachments.filter((item) => item.mediaId !== mediaId));
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    if (atLimit) return;
    addFiles(event.dataTransfer.files);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-subtle">
          {label}
          {!isSingle && ` ${attachments.length}/${maxImages}`}
        </p>
      </div>

      <div
        role="button"
        tabIndex={atLimit ? -1 : 0}
        aria-disabled={atLimit}
        onClick={() => !atLimit && inputRef.current?.click()}
        onKeyDown={(event) => {
          if (!atLimit && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          if (!atLimit) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`mt-2 flex w-full flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed px-6 py-10 text-center transition-colors ${
          atLimit
            ? 'cursor-not-allowed border-border bg-surface-muted'
            : isDragging
              ? 'cursor-pointer border-primary bg-primary-subtle'
              : 'cursor-pointer border-border-strong bg-surface-muted hover:border-green-400 hover:bg-primary-subtle/50'
        }`}
      >
        <span className={`flex h-11 w-11 items-center justify-center rounded-full ${isDragging ? 'bg-primary-subtle text-primary-strong' : 'bg-white text-faint shadow-sm'}`}>
          <UploadIcon className="h-5 w-5" />
        </span>
        {atLimit ? (
          <p className="text-sm font-medium text-faint">Maximum of {maxImages} images reached</p>
        ) : (
          <>
            <p className="text-sm font-semibold text-body">
              <span className="text-primary-strong">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-faint">
              {isSingle
                ? attachments.length > 0
                  ? 'PNG or JPG — drop a new image to replace it'
                  : 'PNG or JPG'
                : `PNG or JPG, up to ${maxImages} images`}
            </p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={!isSingle}
          className="hidden"
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = '';
          }}
        />
      </div>

      {error && <p className="mt-2 text-xs text-danger">{error}</p>}

      {attachments.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {attachments.map((attachment) => (
            <div key={attachment.mediaId} className="group relative aspect-square overflow-hidden rounded-xl border border-border">
              <Image src={attachment.previewUrl} alt="" fill sizes="120px" className="object-cover" />
              {attachment.uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-[10px] font-semibold text-white">
                  Uploading…
                </div>
              )}
              <button
                type="button"
                aria-label="Remove image"
                onClick={(event) => {
                  event.stopPropagation();
                  removeImage(attachment.mediaId);
                }}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
              >
                <XIcon className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
