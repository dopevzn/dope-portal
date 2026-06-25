import { OperationsModulePage } from "@/components/app/operations-module-page";
import type { SearchParamsRecord } from "@/lib/recruitlook-seed";

type PageProps = {
  searchParams?: Promise<SearchParamsRecord>;
};

export default async function AssignmentsPage({ searchParams }: PageProps) {
  return (
    <OperationsModulePage
      moduleId="assignments"
      pathname="/app/assignments"
      searchParams={await searchParams}
    />
  );
}
