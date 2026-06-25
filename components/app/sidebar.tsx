"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandMark } from "@/components/brand-mark";
import { Badge } from "@/components/ui/badge";
import { appNavigationItems, tenantSwitcher } from "@/lib/app-navigation";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();
  const TenantIcon = tenantSwitcher.icon;
  const TrustIcon = tenantSwitcher.trustIcon;

  return (
    <aside className="hidden border-r border-border bg-card/70 lg:flex lg:flex-col">
      <div className="border-b border-border p-5">
        <Link href="/" aria-label="DOPE Portal home">
          <BrandMark />
        </Link>
      </div>
      <div className="border-b border-border p-4">
        <div className="rounded-[8px] border border-border bg-background/78 p-3">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-[8px] bg-primary text-primary-foreground">
              <TenantIcon className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {tenantSwitcher.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {tenantSwitcher.label}
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <Badge>{tenantSwitcher.status}</Badge>
            <TrustIcon className="size-4 text-primary" />
          </div>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3" aria-label="App navigation">
        {appNavigationItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/app"
              ? pathname === "/app"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              prefetch={false}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex h-10 items-center gap-3 rounded-[8px] px-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground",
                isActive &&
                  "bg-primary text-primary-foreground shadow-[0_0_28px_rgba(216,255,66,0.16)] hover:bg-primary hover:text-primary-foreground",
              )}
            >
              <Icon className="size-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border p-4">
        <div className="rounded-[8px] border border-border bg-background/78 p-3">
          <p className="text-xs font-semibold uppercase text-primary">
            RecruitLook access
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Organization roles will attach here when Clerk Organizations are
            wired into tenant membership.
          </p>
        </div>
      </div>
    </aside>
  );
}
