import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import {
  isMediaAssetType,
  isMediaProcessingStatus,
  isMediaVisibility,
} from "@/lib/media-upload-options";
import { getR2Config, getR2PublicUrl } from "@/lib/r2/client";
import { getR2ObjectMetadata } from "@/lib/r2/object-metadata";
import { getRecruitLookPortalContext, type PortalContext } from "@/lib/recruitlook-live-data";
import type { Database, Json } from "@/types/database";

export const runtime = "nodejs";

type MediaFileInsert = Database["public"]["Tables"]["media_files"]["Insert"];

type CompleteUploadRequest = {
  assetType?: unknown;
  athleteId?: unknown;
  creatorId?: unknown;
  eventId?: unknown;
  fileName?: unknown;
  fileSizeBytes?: unknown;
  mimeType?: unknown;
  objectKey?: unknown;
  schoolId?: unknown;
  status?: unknown;
  visibility?: unknown;
};

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function missingR2Column(message: string) {
  return /r2_bucket|r2_key|original_filename|public_url|file_size_bytes|uploaded_by_user_id|download_count|schema cache/i.test(
    message,
  );
}

function isAuthError(error: unknown) {
  return (
    error instanceof Error &&
    error.message.includes("signed-in Clerk user is required")
  );
}

async function validateOptionalCreator(context: PortalContext, creatorId: string | null) {
  if (!creatorId) return null;

  const { data, error } = await context.supabase
    .from("creators")
    .select("id")
    .eq("organization_id", context.organization.id)
    .eq("id", creatorId)
    .maybeSingle();

  if (error) throw new Error(`Creator validation failed: ${error.message}`);
  if (!data) throw new Error("The selected creator was not found for this organization.");

  return creatorId;
}

async function validateOptionalAthlete(context: PortalContext, athleteId: string | null) {
  if (!athleteId) return null;

  const { data, error } = await context.supabase
    .from("athletes")
    .select("id")
    .eq("organization_id", context.organization.id)
    .eq("id", athleteId)
    .maybeSingle();

  if (error) throw new Error(`Athlete validation failed: ${error.message}`);
  if (!data) throw new Error("The selected athlete was not found for this organization.");

  return athleteId;
}

async function validateOptionalSchool(context: PortalContext, schoolId: string | null) {
  if (!schoolId) return null;

  const { data, error } = await context.supabase
    .from("schools")
    .select("id")
    .eq("organization_id", context.organization.id)
    .eq("id", schoolId)
    .maybeSingle();

  if (error) throw new Error(`School validation failed: ${error.message}`);
  if (!data) throw new Error("The selected school was not found for this organization.");

  return schoolId;
}

async function updateStorageUsage(context: PortalContext, fileSizeBytes: number) {
  const storageProvider = "r2";
  const { data, error } = await context.supabase
    .from("storage_usage")
    .select("*")
    .eq("organization_id", context.organization.id)
    .eq("storage_provider", storageProvider)
    .maybeSingle();

  if (error) {
    console.error("Unable to read storage usage", error.message);
    return;
  }

  if (data) {
    const { error: updateError } = await context.supabase
      .from("storage_usage")
      .update({
        calculated_at: new Date().toISOString(),
        media_count: data.media_count + 1,
        used_bytes: data.used_bytes + fileSizeBytes,
      })
      .eq("id", data.id);

    if (updateError) {
      console.error("Unable to update storage usage", updateError.message);
    }

    return;
  }

  const totalBytes = context.organization.storage_limit_gb * 1024 * 1024 * 1024;
  const { error: insertError } = await context.supabase.from("storage_usage").insert({
    calculated_at: new Date().toISOString(),
    media_count: 1,
    organization_id: context.organization.id,
    storage_provider: storageProvider,
    total_bytes: totalBytes,
    used_bytes: fileSizeBytes,
  });

  if (insertError) {
    console.error("Unable to insert storage usage", insertError.message);
  }
}

async function writeUploadAuditLog(
  context: PortalContext,
  mediaFileId: string,
  metadata: Json,
) {
  const { error } = await context.supabase.from("audit_logs").insert({
    action: "media.upload_completed",
    actor_clerk_user_id: context.userId,
    entity_id: mediaFileId,
    entity_type: "media_files",
    metadata,
    organization_id: context.organization.id,
  });

  if (error) {
    console.error("Unable to write upload audit log", error.message);
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CompleteUploadRequest;
    const context = await getRecruitLookPortalContext();
    const eventId = optionalString(body.eventId);
    const fileName = optionalString(body.fileName);
    const mimeType = optionalString(body.mimeType) ?? "application/octet-stream";
    const objectKey = optionalString(body.objectKey);
    const assetType = optionalString(body.assetType);
    const visibility = optionalString(body.visibility);
    const status = optionalString(body.status);
    const creatorId = optionalString(body.creatorId);
    const athleteId = optionalString(body.athleteId);
    const schoolId = optionalString(body.schoolId);
    const fileSizeBytes =
      typeof body.fileSizeBytes === "number" ? body.fileSizeBytes : Number(body.fileSizeBytes);

    if (!eventId) return jsonError("An event is required to complete an upload.");
    if (!fileName) return jsonError("A filename is required to complete an upload.");
    if (!objectKey) return jsonError("An R2 object key is required to complete an upload.");
    if (!Number.isFinite(fileSizeBytes) || fileSizeBytes <= 0) {
      return jsonError("A valid file size is required to complete an upload.");
    }
    if (!assetType || !isMediaAssetType(assetType)) return jsonError("Unsupported asset type.");
    if (!visibility || !isMediaVisibility(visibility)) return jsonError("Unsupported visibility value.");
    if (!status || !isMediaProcessingStatus(status)) return jsonError("Unsupported processing status.");

    const expectedPrefix = `organizations/${context.organization.slug}/events/`;
    if (!objectKey.startsWith(expectedPrefix)) {
      return jsonError("The uploaded object is outside this organization scope.");
    }

    const { data: event, error: eventError } = await context.supabase
      .from("events")
      .select("id, name")
      .eq("organization_id", context.organization.id)
      .eq("id", eventId)
      .maybeSingle();

    if (eventError) {
      console.error("Failed to validate completed upload event", eventError.message);
      return jsonError("Unable to validate the selected event.", 500);
    }

    if (!event) return jsonError("The selected event was not found for this organization.");

    const [validatedCreatorId, validatedAthleteId, validatedSchoolId] = await Promise.all([
      validateOptionalCreator(context, creatorId),
      validateOptionalAthlete(context, athleteId),
      validateOptionalSchool(context, schoolId),
    ]);
    const { bucketName } = getR2Config();
    const r2Object = await getR2ObjectMetadata({
      bucket: bucketName,
      key: objectKey,
    });

    if (!r2Object) {
      return jsonError("The uploaded R2 object was not found.", 409);
    }

    const confirmedFileSizeBytes = r2Object.contentLength ?? fileSizeBytes;
    const confirmedMimeType = r2Object.contentType ?? mimeType;
    console.info("[r2:complete-upload]", {
      bucketName,
      confirmedContentType: confirmedMimeType,
      confirmedFileSizeBytes,
      objectVerified: true,
      requestedContentType: mimeType,
      requestedFileSizeBytes: fileSizeBytes,
      storageProvider: "r2",
    });
    const publicUrl = visibility === "public" ? getR2PublicUrl(objectKey) : null;
    const metadata: Json = {
      asset_type: assetType,
      browser_file_size_bytes: fileSizeBytes,
      original_filename: fileName,
      r2: {
        bucket: bucketName,
        content_type: r2Object.contentType,
        etag: r2Object.eTag,
        key: objectKey,
        last_modified: r2Object.lastModified,
      },
      school_id: validatedSchoolId,
      upload_flow: "direct-browser-r2",
      uploaded_by_user_id: context.userId,
    };
    const insertPayload: MediaFileInsert = {
      athlete_id: validatedAthleteId,
      creator_id: validatedCreatorId,
      download_count: 0,
      event_id: event.id,
      file_name: fileName,
      file_size_bytes: confirmedFileSizeBytes,
      file_type: assetType,
      metadata,
      mime_type: confirmedMimeType,
      organization_id: context.organization.id,
      original_filename: fileName,
      processing_status: status,
      public_url: publicUrl,
      r2_bucket: bucketName,
      r2_key: objectKey,
      size_bytes: confirmedFileSizeBytes,
      storage_key: objectKey,
      storage_provider: "r2",
      uploaded_by_user_id: context.userId,
      visibility,
    };
    const { data, error } = await context.supabase
      .from("media_files")
      .insert(insertPayload)
      .select("*")
      .single();

    if (error && missingR2Column(error.message)) {
      const legacyPayload: MediaFileInsert = {
        athlete_id: validatedAthleteId,
        creator_id: validatedCreatorId,
        event_id: event.id,
        file_name: fileName,
        file_type: assetType,
        metadata,
        mime_type: confirmedMimeType,
        organization_id: context.organization.id,
        processing_status: status,
        size_bytes: confirmedFileSizeBytes,
        storage_key: objectKey,
        storage_provider: "r2",
        visibility,
      };
      const { data: legacyData, error: legacyError } = await context.supabase
        .from("media_files")
        .insert(legacyPayload)
        .select("*")
        .single();

      if (legacyError) {
        console.error("Unable to create legacy media record", legacyError.message);
        return jsonError("The upload finished, but the media record could not be created.", 500);
      }

      await Promise.all([
        updateStorageUsage(context, confirmedFileSizeBytes),
        writeUploadAuditLog(context, legacyData.id, metadata),
      ]);
      revalidatePath("/app");
      revalidatePath("/app/upload");
      revalidatePath("/app/media-library");

      return NextResponse.json({
        mediaFile: {
          fileName: legacyData.file_name,
          fileType: legacyData.file_type,
          id: legacyData.id,
          processingStatus: legacyData.processing_status,
          sizeBytes: legacyData.size_bytes,
          uploadedAt: legacyData.uploaded_at,
          visibility: legacyData.visibility,
        },
      });
    }

    if (error) {
      console.error("Unable to create media record", error.message);
      return jsonError("The upload finished, but the media record could not be created.", 500);
    }

    await Promise.all([
      updateStorageUsage(context, confirmedFileSizeBytes),
      writeUploadAuditLog(context, data.id, metadata),
    ]);
    revalidatePath("/app");
    revalidatePath("/app/upload");
    revalidatePath("/app/media-library");

    return NextResponse.json({
      mediaFile: {
        fileName: data.original_filename ?? data.file_name,
        fileType: data.file_type,
        id: data.id,
        processingStatus: data.processing_status,
        sizeBytes: data.file_size_bytes ?? data.size_bytes,
        uploadedAt: data.uploaded_at,
        visibility: data.visibility,
      },
    });
  } catch (error) {
    if (isAuthError(error)) {
      return jsonError("Authentication required.", 401);
    }

    console.error("Unable to complete R2 upload", error);
    return jsonError(
      error instanceof Error ? error.message : "Unable to complete the upload.",
      500,
    );
  }
}
