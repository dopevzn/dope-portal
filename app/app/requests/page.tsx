import { OperationsModulePage } from "@/components/app/operations-module-page";
import type { SearchParamsRecord } from "@/lib/app-modules";

type PageProps = {
  searchParams?: Promise<SearchParamsRecord>;
};

export default async function RequestsPage({ searchParams }: PageProps) {
  return (
    <OperationsModulePage
      moduleId="requests"
      pathname="/app/requests"
      searchParams={await searchParams}
    />
  );
}
