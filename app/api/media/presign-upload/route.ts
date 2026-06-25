import { NextResponse } from "next/server";

import { buildR2ObjectKey } from "@/lib/r2/keys";
import { createPresignedUpload } from "@/lib/r2/presigned-upload";
import {
  inferAssetTypeFromMime,
  isMediaAssetType,
  isMediaProcessingStatus,
  isMediaVisibility,
} from "@/lib/media-upload-options";
import { getRecruitLookPortalContext } from "@/lib/recruitlook-live-data";

export const runtime = "nodejs";

const maxUploadSizeBytes = 5 * 1024 * 1024 * 1024;

type PresignUploadRequest = {
  assetType?: unknown;
  eventId?: unknown;
  fileName?: unknown;
  fileSizeBytes?: unknown;
  mimeType?: unknown;
  status?: unknown;
  visibility?: unknown;
};

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function validateMimeForAssetType(assetType: string, mimeType: string) {
  if (assetType === "photo" && !mimeType.startsWith("image/")) {
    return "Photo uploads must use an image MIME type.";
  }

  if (assetType === "video" && !mimeType.startsWith("video/")) {
    return "Video uploads must use a video MIME type.";
  }

  if (assetType === "audio" && !mimeType.startsWith("audio/")) {
    return "Audio uploads must use an audio MIME type.";
  }

  return null;
}

function isAuthError(error: unknown) {
  return (
    error instanceof Error &&
    error.message.includes("signed-in Clerk user is required")
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PresignUploadRequest;
    const eventId = optionalString(body.eventId);
    const fileName = optionalString(body.fileName);
    const mimeType = optionalString(body.mimeType) ?? "application/octet-stream";
    const assetTypeInput = optionalString(body.assetType) ?? inferAssetTypeFromMime(mimeType);
    const visibility = optionalString(body.visibility);
    const status = optionalString(body.status);
    const fileSizeBytes =
      typeof body.fileSizeBytes === "number" ? body.fileSizeBytes : Number(body.fileSizeBytes);

    if (!eventId) return jsonError("An event is required before upload.");
    if (!fileName) return jsonError("A filename is required before upload.");
    if (!Number.isFinite(fileSizeBytes) || fileSizeBytes <= 0) {
      return jsonError("A valid file size is required before upload.");
    }
    if (fileSizeBytes > maxUploadSizeBytes) {
      return jsonError("Single-file uploads are limited to 5 GB.");
    }
    if (!isMediaAssetType(assetTypeInput)) {
      return jsonError("Unsupported asset type.");
    }
    if (!visibility || !isMediaVisibility(visibility)) {
      return jsonError("Unsupported visibility value.");
    }
    if (!status || !isMediaProcessingStatus(status)) {
      return jsonError("Unsupported processing status.");
    }

    const mimeError = validateMimeForAssetType(assetTypeInput, mimeType);
    if (mimeError) return jsonError(mimeError);

    const context = await getRecruitLookPortalContext();
    const { data: event, error: eventError } = await context.supabase
      .from("events")
      .select("id, name, starts_at")
      .eq("organization_id", context.organization.id)
      .eq("id", eventId)
      .maybeSingle();

    if (eventError) {
      console.error("Failed to validate upload event", eventError.message);
      return jsonError("Unable to validate the selected event.", 500);
    }

    if (!event) {
      return jsonError("The selected event was not found for this organization.");
    }

    const objectKey = buildR2ObjectKey({
      assetType: assetTypeInput,
      eventName: event.name,
      fileName,
      organizationSlug: context.organization.slug,
    });
    const presignedUpload = await createPresignedUpload({
      contentType: mimeType,
      key: objectKey,
    });

    return NextResponse.json({
      bucket: presignedUpload.bucket,
      expiresIn: presignedUpload.expiresIn,
      headers: presignedUpload.headers,
      method: presignedUpload.method,
      objectKey,
      uploadUrl: presignedUpload.url,
    });
  } catch (error) {
    if (isAuthError(error)) {
      return jsonError("Authentication required.", 401);
    }

    console.error("Unable to create R2 presigned upload URL", error);
    return jsonError("Unable to create an upload URL.", 500);
  }
}
