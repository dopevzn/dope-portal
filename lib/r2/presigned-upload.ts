import "server-only";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { getR2Client, getR2Config } from "@/lib/r2/client";

type CreatePresignedUploadInput = {
  contentType: string;
  key: string;
};

export const uploadUrlExpiresIn = 15 * 60;

export async function createPresignedUpload({
  contentType,
  key,
}: CreatePresignedUploadInput) {
  const { bucketName } = getR2Config();
  const command = new PutObjectCommand({
    Bucket: bucketName,
    ContentType: contentType,
    Key: key,
  });

  const url = await getSignedUrl(getR2Client(), command, {
    expiresIn: uploadUrlExpiresIn,
  });

  return {
    bucket: bucketName,
    expiresIn: uploadUrlExpiresIn,
    headers: {
      "Content-Type": contentType,
    },
    method: "PUT" as const,
    url,
  };
}
