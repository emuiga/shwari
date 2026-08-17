'use client';

import { useRef, useState, type DragEvent } from 'react';
import Image from 'next/image';
import { UploadIcon, XIcon } from '@/components/icons';

interface ImageUploaderProps {
  label?: string;
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export default function ImageUploader({ label = 'Upload Service Images', images, onChange, maxImages = 6 }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const atLimit = images.length >= maxImages;

  function addFiles(files: FileList | null) {
    if (!files || files.length === 0 || atLimit) return;
    const remainingSlots = maxImages - images.length;
    const nextImages = Array.from(files)
      .filter((file) => file.type.startsWith('image/'))
      .slice(0, remainingSlots)
      .map((file) => URL.createObjectURL(file));
    if (nextImages.length > 0) onChange([...images, ...nextImages]);
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
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
        <p className="text-xs font-semibold text-gray-500">
          {label} {images.length}/{maxImages}
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
        className={`mt-2 flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
          atLimit
            ? 'cursor-not-allowed border-gray-200 bg-gray-50'
            : isDragging
              ? 'cursor-pointer border-green-500 bg-green-50'
              : 'cursor-pointer border-gray-300 bg-gray-50 hover:border-green-400 hover:bg-green-50/50'
        }`}
      >
        <span className={`flex h-11 w-11 items-center justify-center rounded-full ${isDragging ? 'bg-green-100 text-green-600' : 'bg-white text-gray-400 shadow-sm'}`}>
          <UploadIcon className="h-5 w-5" />
        </span>
        {atLimit ? (
          <p className="text-sm font-medium text-gray-400">Maximum of {maxImages} images reached</p>
        ) : (
          <>
            <p className="text-sm font-semibold text-gray-700">
              <span className="text-green-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400">PNG or JPG, up to {maxImages} images</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = '';
          }}
        />
      </div>

      {images.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {images.map((image, index) => (
            <div key={`${image}-${index}`} className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200">
              <Image src={image} alt="" fill sizes="120px" className="object-cover" />
              <button
                type="button"
                aria-label="Remove image"
                onClick={(event) => {
                  event.stopPropagation();
                  removeImage(index);
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
