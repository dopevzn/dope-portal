import { OperationsModulePage } from "@/components/app/operations-module-page";
import type { SearchParamsRecord } from "@/lib/recruitlook-seed";

type PageProps = {
  searchParams?: Promise<SearchParamsRecord>;
};

export default async function AnalyticsPage({ searchParams }: PageProps) {
  return (
    <OperationsModulePage
      moduleId="analytics"
      pathname="/app/analytics"
      searchParams={await searchParams}
    />
  );
}
