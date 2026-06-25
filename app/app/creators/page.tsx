import { OperationsModulePage } from "@/components/app/operations-module-page";
import type { SearchParamsRecord } from "@/lib/recruitlook-seed";

type PageProps = {
  searchParams?: Promise<SearchParamsRecord>;
};

export default async function CreatorsPage({ searchParams }: PageProps) {
  return (
    <OperationsModulePage
      moduleId="creators"
      pathname="/app/creators"
      searchParams={await searchParams}
    />
  );
}
