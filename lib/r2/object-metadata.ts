import "server-only";

import { HeadObjectCommand, NoSuchKey } from "@aws-sdk/client-s3";

import { getR2Client, getR2Config } from "@/lib/r2/client";

type GetR2ObjectMetadataInput = {
  bucket?: string | null;
  key: string;
};

export async function getR2ObjectMetadata({
  bucket,
  key,
}: GetR2ObjectMetadataInput) {
  const { bucketName } = getR2Config();
  const command = new HeadObjectCommand({
    Bucket: bucket ?? bucketName,
    Key: key,
  });

  try {
    const response = await getR2Client().send(command);

    return {
      contentLength: response.ContentLength ?? null,
      contentType: response.ContentType ?? null,
      eTag: response.ETag ?? null,
      lastModified: response.LastModified?.toISOString() ?? null,
    };
  } catch (error) {
    if (error instanceof NoSuchKey) {
      return null;
    }

    const maybeStatus = (error as { $metadata?: { httpStatusCode?: number } }).$metadata
      ?.httpStatusCode;

    if (maybeStatus === 404) {
      return null;
    }

    throw error;
  }
}
