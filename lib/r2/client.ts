import "server-only";

import { S3Client } from "@aws-sdk/client-s3";

type R2Config = {
  accountId: string;
  accessKeyId: string;
  bucketName: string;
  publicBaseUrl: string | null;
  secretAccessKey: string;
};

let r2Client: S3Client | null = null;
let r2Config: R2Config | null = null;

function requiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Cloudflare R2 is missing ${name}.`);
  }

  return value;
}

export function getR2Config(): R2Config {
  if (!r2Config) {
    r2Config = {
      accountId: requiredEnv("CLOUDFLARE_ACCOUNT_ID"),
      accessKeyId: requiredEnv("CLOUDFLARE_R2_ACCESS_KEY_ID"),
      bucketName: requiredEnv("CLOUDFLARE_R2_BUCKET_NAME"),
      publicBaseUrl: process.env.CLOUDFLARE_R2_PUBLIC_BASE_URL || null,
      secretAccessKey: requiredEnv("CLOUDFLARE_R2_SECRET_ACCESS_KEY"),
    };
  }

  return r2Config;
}

export function getR2Client() {
  if (!r2Client) {
    const config = getR2Config();

    r2Client = new S3Client({
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
      endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
      region: "auto",
    });
  }

  return r2Client;
}

export function getR2PublicUrl(key: string) {
  const { publicBaseUrl } = getR2Config();

  if (!publicBaseUrl) {
    return null;
  }

  const encodedKey = key.split("/").map(encodeURIComponent).join("/");

  return `${publicBaseUrl.replace(/\/$/, "")}/${encodedKey}`;
}
