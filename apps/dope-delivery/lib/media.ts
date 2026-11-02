import 'server-only';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export function mediaConfigured() {
  return Boolean(process.env.R2_ACCOUNT_ID && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_BUCKET_NAME);
}
export async function signedMediaUrl(key: string, fileName: string, download: boolean) {
  if (!mediaConfigured()) throw new Error('Private media storage is not configured.');
  const client = new S3Client({
    region: 'auto', endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId:process.env.R2_ACCESS_KEY_ID!, secretAccessKey:process.env.R2_SECRET_ACCESS_KEY! },
  });
  const safe = fileName.replace(/[\r\n"\\]/g,'').slice(0,140) || 'deliverable';
  const command = new GetObjectCommand({Bucket:process.env.R2_BUCKET_NAME!, Key:key,
    ResponseContentDisposition: `${download?'attachment':'inline'}; filename="${safe}"`});
  return getSignedUrl(client,command,{expiresIn:300});
}
