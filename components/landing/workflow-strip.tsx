import { ArrowRight } from "lucide-react";

import { workflowSteps } from "@/lib/landing-data";

export function WorkflowStrip() {
  return (
    <section
      id="recruitlook"
      className="rounded-[8px] border border-border bg-card px-4 py-4 shadow-[0_20px_80px_rgba(0,0,0,0.3)] md:px-5"
    >
      <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <h2 className="text-lg font-semibold leading-7 text-foreground">
            RecruitLook Hoops operating loop
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            The first tenant is structured around the real media workflow: event
            coverage, creator assignments, upload routing, delivery, and reporting.
          </p>
        </div>
        <p className="text-xs font-bold uppercase text-primary">
          Tenant-ready from day one
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-5">
        {workflowSteps.map((step, index) => (
          <div
            key={step.label}
            className="relative rounded-[8px] border border-border bg-background/70 p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="grid size-8 place-items-center rounded-[7px] bg-secondary text-xs font-bold text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              {index < workflowSteps.length - 1 ? (
                <ArrowRight className="hidden size-4 text-muted-foreground md:block" />
              ) : null}
            </div>
            <h3 className="text-sm font-semibold text-foreground">{step.label}</h3>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
