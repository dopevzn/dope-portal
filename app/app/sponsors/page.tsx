import { OperationsModulePage } from "@/components/app/operations-module-page";
import type { SearchParamsRecord } from "@/lib/app-modules";

type PageProps = {
  searchParams?: Promise<SearchParamsRecord>;
};

export default async function SponsorsPage({ searchParams }: PageProps) {
  return (
    <OperationsModulePage
      moduleId="sponsors"
      pathname="/app/sponsors"
      searchParams={await searchParams}
    />
  );
}
