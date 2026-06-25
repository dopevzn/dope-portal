import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { buttonVariants } from "@/components/ui/button";
import { marketingNavItems } from "@/lib/landing-data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="flex h-16 items-center justify-between rounded-[8px] border border-border bg-background/82 px-4 shadow-[0_16px_60px_rgba(0,0,0,0.24)] backdrop-blur md:px-5">
      <Link href="/" aria-label="DOPE Portal home">
        <BrandMark />
      </Link>
      <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
        {marketingNavItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <Link
          href="/sign-in"
          prefetch={false}
          className="hidden rounded-[8px] px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground sm:inline-flex"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          prefetch={false}
          className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}
        >
          Request Access
          <ArrowRight data-icon="inline-end" />
        </Link>
      </div>
    </header>
  );
}
