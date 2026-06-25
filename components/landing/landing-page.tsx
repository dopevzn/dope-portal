import Link from "next/link";
import { ArrowRight, ShieldCheck, Workflow, Zap } from "lucide-react";

import { PortalPreview } from "@/components/landing/portal-preview";
import { SiteHeader } from "@/components/landing/site-header";
import { WorkflowStrip } from "@/components/landing/workflow-strip";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const proofItems = [
  {
    icon: Zap,
    label: "RecruitLook first",
    value: "Built around real tournament media ops.",
  },
  {
    icon: Workflow,
    label: "Tenant architecture",
    value: "Ready for schools, leagues, athletes, and sponsors.",
  },
  {
    icon: ShieldCheck,
    label: "Production stack",
    value: "Next.js, Clerk, Supabase, R2, and Stripe-ready.",
  },
] as const;

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative border-b border-border">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(216,255,66,0.08),transparent_24%,transparent_58%,rgba(255,53,72,0.08)),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:auto,72px_72px,72px_72px]" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-5 sm:px-8 lg:px-10">
          <SiteHeader />
          <div className="grid min-h-[calc(100svh-150px)] items-center gap-10 py-6 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="max-w-2xl">
              <h1 className="text-balance text-5xl font-black leading-[0.95] tracking-normal text-foreground sm:text-6xl lg:text-7xl">
                The media operating system for serious sports organizations.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                DOPE Portal gives media directors one tenant-aware command center
                for events, creator assignments, uploads, media delivery,
                sponsor assets, and analytics.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/sign-in"
                  prefetch={false}
                  className={buttonVariants({ size: "lg" })}
                >
                  Sign In
                  <ArrowRight data-icon="inline-end" />
                </Link>
                <Link
                  href="/sign-up"
                  prefetch={false}
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                >
                  Request Access
                </Link>
              </div>
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {proofItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-[8px] border border-border bg-card/76 p-4"
                    >
                      <Icon className="mb-4 size-5 text-primary" />
                      <p className="text-sm font-semibold text-foreground">
                        {item.label}
                      </p>
                      <p className="mt-2 text-xs leading-5 text-muted-foreground">
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <PortalPreview />
          </div>
          <WorkflowStrip />
        </div>
      </section>
    </main>
  );
}
