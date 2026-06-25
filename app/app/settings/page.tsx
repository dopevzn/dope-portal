import { OperationsModulePage } from "@/components/app/operations-module-page";
import type { SearchParamsRecord } from "@/lib/app-modules";

type PageProps = {
  searchParams?: Promise<SearchParamsRecord>;
};

export default async function SettingsPage({ searchParams }: PageProps) {
  return (
    <OperationsModulePage
      moduleId="settings"
      pathname="/app/settings"
      searchParams={await searchParams}
    />
  );
}
