import { OperationsModulePage } from "@/components/app/operations-module-page";
import type { SearchParamsRecord } from "@/lib/recruitlook-seed";

type PageProps = {
  searchParams?: Promise<SearchParamsRecord>;
};

export default async function SchoolsPage({ searchParams }: PageProps) {
  return (
    <OperationsModulePage
      moduleId="schools"
      pathname="/app/schools"
      searchParams={await searchParams}
    />
  );
}
