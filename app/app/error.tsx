"use client";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

type AppErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AppError({ error, reset }: AppErrorProps) {
  return (
    <div className="grid min-h-[70vh] place-items-center p-4">
      <section className="w-full max-w-2xl rounded-[8px] border border-border bg-card p-6 shadow-[0_24px_90px_rgba(0,0,0,0.3)]">
        <div className="grid size-12 place-items-center rounded-[8px] border border-destructive/35 bg-destructive/10 text-destructive">
          <AlertTriangle className="size-5" />
        </div>
        <h1 className="mt-5 text-2xl font-black text-foreground">
          Live data could not load
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          The RecruitLook portal could not read the requested Supabase records.
          Check the Supabase project, environment variables, and seed data, then
          try again.
        </p>
        <p className="mt-4 rounded-[8px] border border-border bg-background p-3 text-sm text-muted-foreground">
          {error.message}
        </p>
        <Button type="button" className="mt-5" onClick={reset}>
          Retry
        </Button>
      </section>
    </div>
  );
}
