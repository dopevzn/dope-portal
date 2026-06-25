import { OperationsModulePage } from "@/components/app/operations-module-page";
import type { SearchParamsRecord } from "@/lib/app-modules";

type PageProps = {
  searchParams?: Promise<SearchParamsRecord>;
};

export default async function MediaLibraryPage({ searchParams }: PageProps) {
  return (
    <OperationsModulePage
      moduleId="media-library"
      pathname="/app/media-library"
      searchParams={await searchParams}
    />
  );
}
