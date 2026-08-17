import { ApiError } from '@/features/auth/data/authApi';
import type { ApiEnvelope } from '@/features/auth/data/types';

interface UploadUrlResponse {
  uploadUrl?: string;
  url?: string;
  mediaId?: string;
  id?: string;
}

export type MediaPurpose = 'SERVICE' | 'PORTFOLIO';

export async function requestMediaUploadUrl(contentType: string, purpose: MediaPurpose) {
  const response = await fetch('/api/providers/me/media/upload-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contentType, purpose }),
  });

  const envelope = (await response.json().catch(() => null)) as ApiEnvelope<UploadUrlResponse> | null;

  if (!envelope || !response.ok || !envelope.success || !envelope.data) {
    throw new ApiError(envelope?.description ?? 'Could not prepare image upload.');
  }

  const uploadUrl = envelope.data.uploadUrl ?? envelope.data.url;
  const mediaId = envelope.data.mediaId ?? envelope.data.id;

  if (!uploadUrl || !mediaId) {
    throw new ApiError('Upload URL response was missing required fields.');
  }

  return { uploadUrl, mediaId };
}

export async function uploadMedia(file: File, purpose: MediaPurpose): Promise<string> {
  const { uploadUrl, mediaId } = await requestMediaUploadUrl(file.type, purpose);

  const putResponse = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });

  if (!putResponse.ok) {
    throw new ApiError('Image upload failed. Please try again.');
  }

  return mediaId;
}
