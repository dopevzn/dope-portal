import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";

type ClerkSetupRequiredProps = {
  title: string;
  description: string;
};

export function ClerkSetupRequired({
  title,
  description,
}: ClerkSetupRequiredProps) {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 py-10 text-foreground">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(216,255,66,0.08),transparent_28%,rgba(255,53,72,0.08)),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:auto,72px_72px,72px_72px]" />
      <section className="relative w-full max-w-lg rounded-[8px] border border-border bg-card p-6 shadow-[0_24px_90px_rgba(0,0,0,0.34)]">
        <BrandMark />
        <h1 className="mt-8 text-3xl font-black leading-tight text-foreground">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
        <div className="mt-5 rounded-[8px] border border-border bg-background/76 p-4">
          <p className="text-sm font-semibold text-foreground">
            Required local variables
          </p>
          <pre className="mt-3 overflow-x-auto rounded-[8px] bg-secondary p-3 text-xs leading-6 text-muted-foreground">
            {`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=`}
          </pre>
        </div>
        <Button asChild className="mt-6">
          <Link href="/">Return to landing page</Link>
        </Button>
      </section>
    </main>
  );
}
