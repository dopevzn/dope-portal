"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

import { StatusBadge } from "@/components/app/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { MediaLibraryItem } from "@/lib/media-types";
import { cn } from "@/lib/utils";

type MediaLibraryTableProps = {
  items: MediaLibraryItem[];
};

type PresignDownloadResponse = {
  downloadUrl: string;
  fileName: string;
};

function badgeVariantForValue(value: string) {
  const normalized = value.toLowerCase();

  if (["photo", "video", "audio"].includes(normalized)) return "cyan";
  if (["public", "client library"].includes(normalized)) return "warning";

  return "secondary";
}

export function MediaLibraryTable({ items }: MediaLibraryTableProps) {
  const [downloadingId, setDownloadingId] = useState("");
  const [downloadError, setDownloadError] = useState("");
  const [localItems, setLocalItems] = useState(items);

  async function onDownload(mediaFileId: string) {
    try {
      setDownloadError("");
      setDownloadingId(mediaFileId);

      const response = await fetch("/api/media/presign-download", {
        body: JSON.stringify({ mediaFileId }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const data = (await response.json()) as PresignDownloadResponse & {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to create a download URL.");
      }

      const link = document.createElement("a");
      link.href = data.downloadUrl;
      link.download = data.fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setLocalItems((currentItems) =>
        currentItems.map((item) =>
          item.id === mediaFileId
            ? { ...item, downloadCount: item.downloadCount + 1 }
            : item,
        ),
      );
    } catch (error) {
      setDownloadError(
        error instanceof Error ? error.message : "Unable to create a download URL.",
      );
    } finally {
      setDownloadingId("");
    }
  }

  return (
    <div className="rounded-[8px] border border-border bg-card">
      {downloadError ? (
        <div className="border-b border-destructive/35 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
          {downloadError}
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-background/70">
              {[
                "File",
                "Type",
                "Event",
                "Creator",
                "Status",
                "Visibility",
                "Uploaded",
                "Size",
                "Downloads",
                "",
              ].map((header) => (
                <th
                  key={header || "actions"}
                  className={cn(
                    "px-4 py-3 text-xs font-bold uppercase text-muted-foreground",
                    ["Size", "Downloads", ""].includes(header) && "text-right",
                  )}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {localItems.map((item) => {
              const isDownloading = downloadingId === item.id;

              return (
                <tr key={item.id} className="transition hover:bg-secondary/55">
                  <td className="max-w-[260px] px-4 py-3 text-sm font-semibold text-foreground">
                    <span className="block truncate">{item.fileName}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={badgeVariantForValue(item.fileType)}>
                      {item.fileType}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{item.eventName}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {item.creatorName}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={badgeVariantForValue(item.visibility)}>
                      {item.visibility}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {item.uploadedAt}
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-foreground">
                    {item.sizeLabel}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-muted-foreground">
                    {item.downloadCount}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      disabled={!item.canDownload || isDownloading}
                      onClick={() => onDownload(item.id)}
                      title={
                        item.canDownload
                          ? "Create download link"
                          : "R2 object not available for this record"
                      }
                    >
                      {isDownloading ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Download className="size-4" />
                      )}
                      Download
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
