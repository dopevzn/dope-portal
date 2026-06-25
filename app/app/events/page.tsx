import { OperationsModulePage } from "@/components/app/operations-module-page";
import type { SearchParamsRecord } from "@/lib/recruitlook-seed";

type PageProps = {
  searchParams?: Promise<SearchParamsRecord>;
};

export default async function EventsPage({ searchParams }: PageProps) {
  return (
    <OperationsModulePage
      moduleId="events"
      pathname="/app/events"
      searchParams={await searchParams}
    />
  );
}
