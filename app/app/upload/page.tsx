import { OperationsModulePage } from "@/components/app/operations-module-page";
import type { SearchParamsRecord } from "@/lib/app-modules";

type PageProps = {
  searchParams?: Promise<SearchParamsRecord>;
};

export default async function UploadCenterPage({ searchParams }: PageProps) {
  return (
    <OperationsModulePage
      moduleId="upload"
      pathname="/app/upload"
      searchParams={await searchParams}
    />
  );
}
