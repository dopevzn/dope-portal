import { DataTable } from "@/components/app/data-table";
import { EmptyState } from "@/components/app/empty-state";
import { FilterBar } from "@/components/app/filter-bar";
import { ModuleCard } from "@/components/app/module-card";
import { PageShell } from "@/components/app/page-shell";
import { UploadCenter } from "@/components/app/upload-center";
import { getModuleChrome, type SearchParamsRecord } from "@/lib/app-modules";
import { getUploadCenterData } from "@/lib/recruitlook-live-data";

type PageProps = {
  searchParams?: Promise<SearchParamsRecord>;
};

export default async function UploadCenterPage({ searchParams }: PageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const chrome = getModuleChrome("upload");
  const uploadData = await getUploadCenterData(resolvedSearchParams);

  return (
    <PageShell
      eyebrow={chrome.eyebrow}
      title={chrome.title}
      description={chrome.description}
      stats={uploadData.stats}
    >
      <UploadCenter
        athletes={uploadData.athletes}
        creators={uploadData.creators}
        events={uploadData.events}
        schools={uploadData.schools}
      />

      <FilterBar
        filters={chrome.filters}
        pathname="/app/upload"
        searchParams={resolvedSearchParams}
      />

      {uploadData.recentUploads.length ? (
        <DataTable columns={chrome.columns} rows={uploadData.recentUploads} />
      ) : (
        <EmptyState
          title={chrome.emptyState.title}
          description={chrome.emptyState.description}
        />
      )}

      <section className="grid gap-4 md:grid-cols-2">
        {uploadData.cards.map((card) => (
          <ModuleCard key={card.label} {...card} />
        ))}
      </section>
    </PageShell>
  );
}
