import { PageShell } from "@/components/app/page-shell";

export default function AppLoading() {
  return (
    <PageShell
      eyebrow="RecruitLook Hoops"
      title="Loading workspace"
      description="Fetching live RecruitLook records from Supabase."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-[150px] animate-pulse rounded-[8px] border border-border bg-card"
          />
        ))}
      </section>
      <div className="h-[360px] animate-pulse rounded-[8px] border border-border bg-card" />
    </PageShell>
  );
}
