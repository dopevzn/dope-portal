export const mediaAssetTypes = [
  { label: "Photo", value: "photo" },
  { label: "Video", value: "video" },
  { label: "Audio", value: "audio" },
  { label: "Document", value: "document" },
] as const;

export const mediaVisibilityOptions = [
  { label: "Internal", value: "internal" },
  { label: "Client Library", value: "client library" },
  { label: "Public", value: "public" },
] as const;

export const mediaProcessingStatusOptions = [
  { label: "Ready", value: "ready" },
  { label: "Needs Tags", value: "needs tags" },
  { label: "Processing", value: "processing" },
  { label: "Queued", value: "queued" },
] as const;

export type MediaAssetType = (typeof mediaAssetTypes)[number]["value"];
export type MediaVisibility = (typeof mediaVisibilityOptions)[number]["value"];
export type MediaProcessingStatus =
  (typeof mediaProcessingStatusOptions)[number]["value"];

export function isMediaAssetType(value: string): value is MediaAssetType {
  return mediaAssetTypes.some((option) => option.value === value);
}

export function isMediaVisibility(value: string): value is MediaVisibility {
  return mediaVisibilityOptions.some((option) => option.value === value);
}

export function isMediaProcessingStatus(
  value: string,
): value is MediaProcessingStatus {
  return mediaProcessingStatusOptions.some((option) => option.value === value);
}

export function inferAssetTypeFromMime(mimeType: string): MediaAssetType {
  if (mimeType.startsWith("image/")) return "photo";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("audio/")) return "audio";

  return "document";
}
