import { EmptyState } from "@/components/app/empty-state";
import { FilterBar } from "@/components/app/filter-bar";
import { MediaLibraryTable } from "@/components/app/media-library-table";
import { ModuleCard } from "@/components/app/module-card";
import { PageShell } from "@/components/app/page-shell";
import { getModuleChrome, type SearchParamsRecord } from "@/lib/app-modules";
import { getMediaLibraryPageData } from "@/lib/recruitlook-live-data";

type PageProps = {
  searchParams?: Promise<SearchParamsRecord>;
};

export default async function MediaLibraryPage({ searchParams }: PageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const chrome = getModuleChrome("media-library");
  const mediaData = await getMediaLibraryPageData(resolvedSearchParams);

  return (
    <PageShell
      eyebrow={chrome.eyebrow}
      title={chrome.title}
      description={chrome.description}
      stats={mediaData.stats}
    >
      <FilterBar
        filters={chrome.filters}
        pathname="/app/media-library"
        searchParams={resolvedSearchParams}
      />

      {mediaData.items.length ? (
        <MediaLibraryTable items={mediaData.items} />
      ) : (
        <EmptyState
          title={chrome.emptyState.title}
          description={chrome.emptyState.description}
        />
      )}

      <section className="grid gap-4 md:grid-cols-2">
        {mediaData.cards.map((card) => (
          <ModuleCard key={card.label} {...card} />
        ))}
      </section>
    </PageShell>
  );
}
