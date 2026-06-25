import { OperationsModulePage } from "@/components/app/operations-module-page";
import type { SearchParamsRecord } from "@/lib/app-modules";

type PageProps = {
  searchParams?: Promise<SearchParamsRecord>;
};

export default async function DeliverablesPage({ searchParams }: PageProps) {
  return (
    <OperationsModulePage
      moduleId="deliverables"
      pathname="/app/deliverables"
      searchParams={await searchParams}
    />
  );
}
