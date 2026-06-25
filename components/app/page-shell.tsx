import type { ReactNode } from "react";

import { SectionHeader } from "@/components/app/section-header";
import { StatCard } from "@/components/app/stat-card";
import type { StatSnapshot } from "@/lib/recruitlook-seed";

type PageShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
  stats?: StatSnapshot[];
  action?: ReactNode;
  children: ReactNode;
};

export function PageShell({
  eyebrow,
  title,
  description,
  stats = [],
  action,
  children,
}: PageShellProps) {
  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-[8px] border border-border bg-card p-5 shadow-[0_24px_90px_rgba(0,0,0,0.3)] lg:p-6">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          action={action}
        />
      </section>

      {stats.length ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </section>
      ) : null}

      {children}
    </div>
  );
}
