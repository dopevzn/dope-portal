import { OperationsModulePage } from "@/components/app/operations-module-page";
import type { SearchParamsRecord } from "@/lib/recruitlook-seed";

type PageProps = {
  searchParams?: Promise<SearchParamsRecord>;
};

export default async function AthletesPage({ searchParams }: PageProps) {
  return (
    <OperationsModulePage
      moduleId="athletes"
      pathname="/app/athletes"
      searchParams={await searchParams}
    />
  );
}
