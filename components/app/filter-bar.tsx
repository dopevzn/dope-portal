import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { FilterDefinition, SearchParamsRecord } from "@/lib/recruitlook-seed";
import { getFirstParam } from "@/lib/recruitlook-seed";
import { cn } from "@/lib/utils";

type FilterBarProps = {
  filters: FilterDefinition[];
  pathname: string;
  searchParams: SearchParamsRecord;
};

function hrefForFilter(
  pathname: string,
  searchParams: SearchParamsRecord,
  key: string,
  value: string,
) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([paramKey, paramValue]) => {
    const firstValue = getFirstParam(paramValue);

    if (firstValue && paramKey !== key) {
      params.set(paramKey, firstValue);
    }
  });

  if (value !== "all") {
    params.set(key, value);
  }

  const query = params.toString();

  return query ? `${pathname}?${query}` : pathname;
}

export function FilterBar({ filters, pathname, searchParams }: FilterBarProps) {
  const q = getFirstParam(searchParams.q) ?? "";

  return (
    <div className="rounded-[8px] border border-border bg-card p-4">
      <div className="flex flex-col gap-4">
        <form className="flex flex-col gap-3 md:flex-row" action={pathname}>
          {filters.map((filter) => {
            const value = getFirstParam(searchParams[filter.key]);

            return value && value !== "all" ? (
              <input
                key={filter.key}
                type="hidden"
                name={filter.key}
                value={value}
              />
            ) : null;
          })}
          <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-[8px] border border-border bg-background px-3 text-sm text-muted-foreground">
            <Search className="size-4 shrink-0" />
            <span className="sr-only">Search records</span>
            <input
              name="q"
              defaultValue={q}
              placeholder="Search records"
              className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </label>
          <Button type="submit" variant="secondary">
            Search
          </Button>
        </form>

        <div className="flex flex-col gap-3">
          {filters.map((filter) => {
            const activeValue = getFirstParam(searchParams[filter.key]) ?? "all";

            return (
              <div key={filter.key} className="flex flex-wrap items-center gap-2">
                <p className="mr-1 text-xs font-bold uppercase text-muted-foreground">
                  {filter.label}
                </p>
                {filter.options.map((option) => {
                  const isActive = option.value === activeValue;

                  return (
                    <Link
                      key={option.value}
                      href={hrefForFilter(pathname, searchParams, filter.key, option.value)}
                      prefetch={false}
                      className={cn(
                        "inline-flex h-8 items-center rounded-[7px] border px-3 text-xs font-semibold transition",
                        isActive
                          ? "border-primary/40 bg-primary text-primary-foreground"
                          : "border-border bg-background text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {option.label}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
