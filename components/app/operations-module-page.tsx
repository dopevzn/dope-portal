import { DataTable } from "@/components/app/data-table";
import { EmptyState } from "@/components/app/empty-state";
import { FilterBar } from "@/components/app/filter-bar";
import { ModuleCard } from "@/components/app/module-card";
import { PageShell } from "@/components/app/page-shell";
import type { ModuleId, SearchParamsRecord } from "@/lib/app-modules";
import { getOperationsModuleData } from "@/lib/recruitlook-live-data";

type OperationsModulePageProps = {
  moduleId: ModuleId;
  pathname: string;
  searchParams?: SearchParamsRecord;
};

export async function OperationsModulePage({
  moduleId,
  pathname,
  searchParams = {},
}: OperationsModulePageProps) {
  const moduleData = await getOperationsModuleData(moduleId, searchParams);

  return (
    <PageShell
      eyebrow={moduleData.eyebrow}
      title={moduleData.title}
      description={moduleData.description}
      stats={moduleData.stats}
    >
      <FilterBar
        filters={moduleData.filters}
        pathname={pathname}
        searchParams={searchParams}
      />

      {moduleData.rows.length ? (
        <DataTable columns={moduleData.columns} rows={moduleData.rows} />
      ) : (
        <EmptyState
          title={moduleData.emptyState.title}
          description={moduleData.emptyState.description}
        />
      )}

      <section className="grid gap-4 md:grid-cols-2">
        {moduleData.cards.map((card) => (
          <ModuleCard key={card.label} {...card} />
        ))}
      </section>
    </PageShell>
  );
}
