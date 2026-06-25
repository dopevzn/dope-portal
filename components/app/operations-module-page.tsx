import { DataTable } from "@/components/app/data-table";
import { EmptyState } from "@/components/app/empty-state";
import { FilterBar } from "@/components/app/filter-bar";
import { ModuleCard } from "@/components/app/module-card";
import { PageShell } from "@/components/app/page-shell";
import {
  getModuleDefinition,
  getModuleRows,
  type ModuleId,
  type SearchParamsRecord,
} from "@/lib/recruitlook-seed";

type OperationsModulePageProps = {
  moduleId: ModuleId;
  pathname: string;
  searchParams?: SearchParamsRecord;
};

export function OperationsModulePage({
  moduleId,
  pathname,
  searchParams = {},
}: OperationsModulePageProps) {
  const moduleDefinition = getModuleDefinition(moduleId);
  const rows = getModuleRows(moduleId, searchParams);

  return (
    <PageShell
      eyebrow={moduleDefinition.eyebrow}
      title={moduleDefinition.title}
      description={moduleDefinition.description}
      stats={moduleDefinition.stats}
    >
      <FilterBar
        filters={moduleDefinition.filters}
        pathname={pathname}
        searchParams={searchParams}
      />

      {rows.length ? (
        <DataTable columns={moduleDefinition.columns} rows={rows} />
      ) : (
        <EmptyState
          title={moduleDefinition.emptyState.title}
          description={moduleDefinition.emptyState.description}
        />
      )}

      <section className="grid gap-4 md:grid-cols-2">
        {moduleDefinition.cards.map((card) => (
          <ModuleCard key={card.label} {...card} />
        ))}
      </section>
    </PageShell>
  );
}
