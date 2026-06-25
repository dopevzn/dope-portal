import { UserButton } from "@clerk/nextjs";
import { Bell, ChevronDown, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { tenantSwitcher } from "@/lib/app-navigation";

export function AppTopbar() {
  return (
    <header className="sticky top-0 border-b border-border bg-background/88 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid size-10 place-items-center rounded-[8px] border border-border bg-card lg:hidden">
            <span className="text-xs font-black text-primary">DP</span>
          </div>
          <button
            type="button"
            className="flex min-w-0 items-center gap-3 rounded-[8px] border border-border bg-card px-3 py-2 text-left"
            aria-label="Tenant switcher placeholder"
          >
            <span className="grid size-8 place-items-center rounded-[7px] bg-primary text-xs font-black text-primary-foreground">
              RL
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block truncate text-sm font-semibold text-foreground">
                {tenantSwitcher.name}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {tenantSwitcher.status}
              </span>
            </span>
            <ChevronDown className="size-4 text-muted-foreground" />
          </button>
        </div>
        <div className="hidden flex-1 justify-center md:flex">
          <div className="flex h-10 w-full max-w-md items-center gap-2 rounded-[8px] border border-border bg-card px-3 text-sm text-muted-foreground">
            <Search className="size-4" />
            <span className="truncate">Search events, media, creators, athletes</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="cyan">RecruitLook</Badge>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-[8px] border border-border bg-card text-muted-foreground transition hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
          </button>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "size-10",
                userButtonPopoverCard:
                  "rounded-lg border border-border bg-card text-foreground",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
