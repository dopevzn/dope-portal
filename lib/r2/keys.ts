import "server-only";

import { randomUUID } from "node:crypto";

type BuildR2ObjectKeyInput = {
  assetType: string;
  eventName: string;
  fileName: string;
  organizationSlug: string;
  timestamp?: Date;
  uuid?: string;
};

export function slugifySegment(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "unassigned";
}

export function safeFilename(fileName: string) {
  const baseName = fileName.split(/[\\/]/).pop() ?? "upload";
  const normalized = baseName
    .normalize("NFKD")
    .replace(/['"]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 140);

  return normalized || "upload.bin";
}

export function buildR2ObjectKey({
  assetType,
  eventName,
  fileName,
  organizationSlug,
  timestamp = new Date(),
  uuid = randomUUID(),
}: BuildR2ObjectKeyInput) {
  const date = timestamp.toISOString().slice(0, 10);

  return [
    "organizations",
    slugifySegment(organizationSlug),
    "events",
    slugifySegment(eventName),
    slugifySegment(assetType),
    date,
    `${uuid}-${safeFilename(fileName)}`,
  ].join("/");
}
