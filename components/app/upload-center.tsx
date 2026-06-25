"use client";

import { useRef, useState, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, CheckCircle2, FileUp, UploadCloud } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  bytesToDisplay,
  titleCase,
} from "@/lib/app-modules";
import {
  inferAssetTypeFromMime,
  mediaAssetTypes,
  mediaProcessingStatusOptions,
  mediaVisibilityOptions,
  type MediaAssetType,
  type MediaProcessingStatus,
  type MediaVisibility,
} from "@/lib/media-upload-options";
import type { UploadOption } from "@/lib/media-types";
import { cn } from "@/lib/utils";

type UploadCenterProps = {
  athletes: UploadOption[];
  creators: UploadOption[];
  events: UploadOption[];
  schools: UploadOption[];
};

type PresignUploadResponse = {
  headers: Record<string, string>;
  objectKey: string;
  uploadUrl: string;
};

type CompleteUploadResponse = {
  mediaFile: {
    fileName: string;
    id: string;
  };
};

type UploadPhase = "idle" | "presigning" | "uploading" | "recording" | "complete";

const fieldClass =
  "h-11 w-full rounded-[8px] border border-border bg-background px-3 text-sm font-semibold text-foreground outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20";

async function jsonPost<TResponse>(url: string, body: Record<string, unknown>) {
  const response = await fetch(url, {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const data = (await response.json()) as TResponse & { error?: string };

  if (!response.ok) {
    throw new Error(data.error ?? "Request failed.");
  }

  return data;
}

function uploadFileToR2(
  file: File,
  presigned: PresignUploadResponse,
  onProgress: (progress: number) => void,
) {
  return new Promise<void>((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.open("PUT", presigned.uploadUrl);
    Object.entries(presigned.headers).forEach(([key, value]) => {
      request.setRequestHeader(key, value);
    });
    request.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        resolve();
        return;
      }

      reject(new Error(`R2 upload failed with status ${request.status}.`));
    };
    request.onerror = () => reject(new Error("Network error while uploading to R2."));
    request.send(file);
  });
}

function optionLabel(options: UploadOption[], id: string) {
  return options.find((option) => option.id === id)?.label ?? "Unassigned";
}

export function UploadCenter({
  athletes,
  creators,
  events,
  schools,
}: UploadCenterProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [assetType, setAssetType] = useState<MediaAssetType>("photo");
  const [athleteId, setAthleteId] = useState("");
  const [creatorId, setCreatorId] = useState("");
  const [eventId, setEventId] = useState(events[0]?.id ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [phase, setPhase] = useState<UploadPhase>("idle");
  const [progress, setProgress] = useState(0);
  const [schoolId, setSchoolId] = useState("");
  const [status, setStatus] = useState<MediaProcessingStatus>("ready");
  const [visibility, setVisibility] = useState<MediaVisibility>("internal");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const isUploading = phase !== "idle" && phase !== "complete";

  function selectFile(nextFile: File | null) {
    setError("");
    setSuccess("");
    setFile(nextFile);

    if (nextFile) {
      setAssetType(inferAssetTypeFromMime(nextFile.type || "application/octet-stream"));
    }
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    selectFile(event.dataTransfer.files.item(0));
  }

  async function onSubmit() {
    if (!file) {
      setError("Select a file before starting the upload.");
      return;
    }

    if (!eventId) {
      setError("Select an event before starting the upload.");
      return;
    }

    try {
      setError("");
      setSuccess("");
      setPhase("presigning");
      setProgress(8);

      const basePayload = {
        assetType,
        athleteId: athleteId || undefined,
        creatorId: creatorId || undefined,
        eventId,
        fileName: file.name,
        fileSizeBytes: file.size,
        mimeType: file.type || "application/octet-stream",
        schoolId: schoolId || undefined,
        status,
        visibility,
      };
      const presigned = await jsonPost<PresignUploadResponse>(
        "/api/media/presign-upload",
        basePayload,
      );

      setPhase("uploading");
      setProgress(12);
      await uploadFileToR2(file, presigned, (nextProgress) =>
        setProgress(Math.max(12, Math.min(90, nextProgress))),
      );

      setPhase("recording");
      setProgress(94);
      const completed = await jsonPost<CompleteUploadResponse>(
        "/api/media/complete-upload",
        {
          ...basePayload,
          objectKey: presigned.objectKey,
        },
      );

      setPhase("complete");
      setProgress(100);
      setSuccess(`${completed.mediaFile.fileName} is uploaded and recorded.`);
      router.refresh();
    } catch (uploadError) {
      setPhase("idle");
      setProgress(0);
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Upload failed before the media record was saved.",
      );
    }
  }

  return (
    <section className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
      <div
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDrop={onDrop}
        className={cn(
          "flex min-h-[360px] flex-col justify-between rounded-[8px] border border-dashed border-border bg-card p-5 transition",
          isDragging && "border-primary/70 bg-primary/5",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase text-primary">R2 Ingest</p>
            <h2 className="mt-2 text-2xl font-bold tracking-normal text-foreground">
              Upload media to RecruitLook storage
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Files are sent directly to Cloudflare R2, then recorded in Supabase
              for routing, delivery, and download access.
            </p>
          </div>
          <Badge variant={phase === "complete" ? "success" : "cyan"}>
            {phase === "idle" ? "Ready" : titleCase(phase)}
          </Badge>
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-6 flex min-h-[172px] flex-col items-center justify-center rounded-[8px] border border-border bg-background/80 px-5 text-center transition hover:border-primary/55 hover:bg-primary/5"
        >
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            onChange={(event) => selectFile(event.target.files?.item(0) ?? null)}
          />
          <UploadCloud className="size-9 text-primary" />
          <p className="mt-4 text-sm font-bold text-foreground">
            {file ? file.name : "Choose or drop a media file"}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {file
              ? `${bytesToDisplay(file.size)} - ${file.type || "application/octet-stream"}`
              : "Single-file browser uploads up to 5 GB"}
          </p>
        </button>

        <div className="mt-5">
          <div className="h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 text-xs font-semibold uppercase text-muted-foreground">
            <span>{isUploading ? titleCase(phase) : "Idle"}</span>
            <span>{progress}%</span>
          </div>
        </div>

        {error ? (
          <div className="mt-5 flex items-start gap-3 rounded-[8px] border border-destructive/35 bg-destructive/10 p-4 text-sm text-destructive">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <p>{error}</p>
          </div>
        ) : null}

        {success ? (
          <div className="mt-5 flex items-start gap-3 rounded-[8px] border border-[rgba(62,221,132,0.34)] bg-[rgba(62,221,132,0.1)] p-4 text-sm text-[rgb(115,240,169)]">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            <p>{success}</p>
          </div>
        ) : null}
      </div>

      <div className="rounded-[8px] border border-border bg-card p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-[8px] border border-primary/30 bg-primary/10 text-primary">
            <FileUp className="size-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">Upload Routing</h2>
            <p className="text-sm text-muted-foreground">
              Required metadata for the media file record.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold text-foreground">
            Event
            <select
              className={fieldClass}
              value={eventId}
              onChange={(event) => setEventId(event.target.value)}
            >
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.label}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-foreground">
              Asset Type
              <select
                className={fieldClass}
                value={assetType}
                onChange={(event) => setAssetType(event.target.value as MediaAssetType)}
              >
                {mediaAssetTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-foreground">
              Status
              <select
                className={fieldClass}
                value={status}
                onChange={(event) => setStatus(event.target.value as MediaProcessingStatus)}
              >
                {mediaProcessingStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="grid gap-2 text-sm font-semibold text-foreground">
            Visibility
            <select
              className={fieldClass}
              value={visibility}
              onChange={(event) => setVisibility(event.target.value as MediaVisibility)}
            >
              {mediaVisibilityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-semibold text-foreground">
            Creator
            <select
              className={fieldClass}
              value={creatorId}
              onChange={(event) => setCreatorId(event.target.value)}
            >
              <option value="">Unassigned</option>
              {creators.map((creator) => (
                <option key={creator.id} value={creator.id}>
                  {creator.label}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-foreground">
              Athlete
              <select
                className={fieldClass}
                value={athleteId}
                onChange={(event) => setAthleteId(event.target.value)}
              >
                <option value="">Unassigned</option>
                {athletes.map((athlete) => (
                  <option key={athlete.id} value={athlete.id}>
                    {athlete.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-foreground">
              School
              <select
                className={fieldClass}
                value={schoolId}
                onChange={(event) => setSchoolId(event.target.value)}
              >
                <option value="">Unassigned</option>
                {schools.map((school) => (
                  <option key={school.id} value={school.id}>
                    {school.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="rounded-[8px] border border-border bg-background p-4">
            <p className="text-xs font-bold uppercase text-muted-foreground">
              Current Routing
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground">
              {optionLabel(events, eventId)} / {titleCase(assetType)} /{" "}
              {creatorId ? optionLabel(creators, creatorId) : "Unassigned creator"}
            </p>
          </div>

          <Button
            type="button"
            disabled={isUploading || !file || !eventId}
            onClick={onSubmit}
            className="w-full"
          >
            <UploadCloud data-icon="inline-start" className="size-4" />
            {isUploading ? "Uploading" : "Upload to R2"}
          </Button>
        </div>
      </div>
    </section>
  );
}
