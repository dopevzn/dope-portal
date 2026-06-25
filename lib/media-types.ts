import type { ModuleCardData, ModuleRow, StatSnapshot } from "@/lib/app-modules";

export type UploadOption = {
  detail?: string;
  id: string;
  label: string;
};

export type UploadCenterData = {
  athletes: UploadOption[];
  cards: ModuleCardData[];
  creators: UploadOption[];
  events: UploadOption[];
  recentUploads: ModuleRow[];
  schools: UploadOption[];
  stats: StatSnapshot[];
};

export type MediaLibraryItem = {
  canDownload: boolean;
  creatorName: string;
  downloadCount: number;
  eventName: string;
  fileName: string;
  fileType: string;
  id: string;
  sizeLabel: string;
  status: string;
  uploadedAt: string;
  visibility: string;
};

export type MediaLibraryPageData = {
  cards: ModuleCardData[];
  items: MediaLibraryItem[];
  stats: StatSnapshot[];
};
