import "server-only";

import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { getR2Client, getR2Config } from "@/lib/r2/client";
import { safeFilename } from "@/lib/r2/keys";

type CreatePresignedDownloadInput = {
  bucket?: string | null;
  fileName: string;
  key: string;
  mimeType?: string | null;
};

export const downloadUrlExpiresIn = 10 * 60;

export async function createPresignedDownload({
  bucket,
  fileName,
  key,
  mimeType,
}: CreatePresignedDownloadInput) {
  const { bucketName } = getR2Config();
  const safeName = safeFilename(fileName);
  const command = new GetObjectCommand({
    Bucket: bucket || bucketName,
    Key: key,
    ResponseContentDisposition: `attachment; filename="${safeName}"`,
    ResponseContentType: mimeType ?? undefined,
  });

  const url = await getSignedUrl(getR2Client(), command, {
    expiresIn: downloadUrlExpiresIn,
  });

  return {
    expiresIn: downloadUrlExpiresIn,
    fileName: safeName,
    url,
  };
}
