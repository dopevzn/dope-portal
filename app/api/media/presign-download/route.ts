import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { createPresignedDownload } from "@/lib/r2/presigned-download";
import { getRecruitLookPortalContext, type PortalContext } from "@/lib/recruitlook-live-data";
import type { Database, Json } from "@/types/database";

export const runtime = "nodejs";

type MediaFileRow = Database["public"]["Tables"]["media_files"]["Row"];

type PresignDownloadRequest = {
  mediaFileId?: unknown;
};

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function missingDownloadCountColumn(message: string) {
  return /download_count|schema cache/i.test(message);
}

function isAuthError(error: unknown) {
  return (
    error instanceof Error &&
    error.message.includes("signed-in Clerk user is required")
  );
}

async function writeDownloadAuditLog(context: PortalContext, mediaFile: MediaFileRow) {
  const metadata: Json = {
    file_name: mediaFile.original_filename ?? mediaFile.file_name,
    provider: mediaFile.storage_provider,
  };
  const { error } = await context.supabase.from("audit_logs").insert({
    action: "media.download_presigned",
    actor_clerk_user_id: context.userId,
    entity_id: mediaFile.id,
    entity_type: "media_files",
    metadata,
    organization_id: context.organization.id,
  });

  if (error) {
    console.error("Unable to write download audit log", error.message);
  }
}

async function incrementDownloadCount(context: PortalContext, mediaFile: MediaFileRow) {
  const { error } = await context.supabase
    .from("media_files")
    .update({
      download_count: (mediaFile.download_count ?? 0) + 1,
    })
    .eq("id", mediaFile.id)
    .eq("organization_id", context.organization.id);

  if (error && !missingDownloadCountColumn(error.message)) {
    console.error("Unable to increment download count", error.message);
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PresignDownloadRequest;
    const mediaFileId = optionalString(body.mediaFileId);

    if (!mediaFileId) {
      return jsonError("A media file id is required.");
    }

    const context = await getRecruitLookPortalContext();
    const { data: mediaFile, error } = await context.supabase
      .from("media_files")
      .select("*")
      .eq("organization_id", context.organization.id)
      .eq("id", mediaFileId)
      .maybeSingle();

    if (error) {
      console.error("Unable to find media file for download", error.message);
      return jsonError("Unable to find the media file.", 500);
    }

    if (!mediaFile) {
      return jsonError("The selected media file was not found.", 404);
    }

    if (mediaFile.storage_provider !== "r2") {
      return jsonError("This media record is not backed by an R2 object yet.", 409);
    }

    const objectKey = mediaFile.r2_key ?? mediaFile.storage_key;
    if (!objectKey) {
      return jsonError("This media record does not have a downloadable object.", 409);
    }

    const presignedDownload = await createPresignedDownload({
      bucket: mediaFile.r2_bucket,
      fileName: mediaFile.original_filename ?? mediaFile.file_name,
      key: objectKey,
      mimeType: mediaFile.mime_type,
    });

    await Promise.all([
      incrementDownloadCount(context, mediaFile),
      writeDownloadAuditLog(context, mediaFile),
    ]);
    revalidatePath("/app/media-library");

    return NextResponse.json({
      downloadUrl: presignedDownload.url,
      expiresIn: presignedDownload.expiresIn,
      fileName: presignedDownload.fileName,
    });
  } catch (error) {
    if (isAuthError(error)) {
      return jsonError("Authentication required.", 401);
    }

    console.error("Unable to create R2 presigned download URL", error);
    return jsonError("Unable to create a download URL.", 500);
  }
}
